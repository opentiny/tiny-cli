import * as path from 'path';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import * as dotenv from 'dotenv';
import inquirer, { QuestionCollection } from 'inquirer';
import { cliConfig, logs, fs } from '@opentiny/cli-devkit';
import { ProjectInfo, ServerFrameworks } from './interfaces';
import utils from './utils';


const log = logs('tiny-toolkit-pro');
const VUE_TEMPLATE_PATH = 'tinyvue';
const NG_TEMPLATE_PATH = 'tinyng';

/**
 * 询问创建项目的描述，使用的技术栈
 *
 * @returns object { description: 项目描述,framework: 框架, name: 项目名称 ,ServerFramework:使用技术栈, dialect：数据库，DB_host:数据库地址，DB_port:数据库端口，database：数据库名称，username：数据库用户名，password：数据库密码，}
 */
const getProjectInfo = (): Promise<ProjectInfo> => {
  const basename = path.basename(utils.getDistPath());
  const question: QuestionCollection<ProjectInfo> = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称：',
      default: basename,
      // 必填校验
      validate: (input: string) => Boolean(input),
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入项目描述：',
      default: '基于TinyPro套件创建的中后台系统',
    },
    {
      type: 'list',
      name: 'framework',
      message: '请选择您希望使用的客户端技术栈：',
      choices: [
        { name: 'vue', value: VUE_TEMPLATE_PATH },
        { name: 'angular', value: NG_TEMPLATE_PATH },
      ],
      default: VUE_TEMPLATE_PATH,
      prefix: '*',
    },
    {
      type: 'list',
      name: 'serverFramework',
      message: '请选择您希望使用的服务端技术栈：',
      choices: [
        { name: 'Egg.js', value: ServerFrameworks.EggJs },
        { name: 'Spring Cloud', value: ServerFrameworks.SpringCloud },
        { name: 'Nest.js', value: ServerFrameworks.NestJs },
        { name: '暂不配置', value: ServerFrameworks.Skip },
      ],
      default: ServerFrameworks.EggJs,
      prefix: '*',
    },
    {
      type: 'list',
      name: 'dialect',
      message: '请选择数据库类型：',
      choices: [
        { name: 'mySQL', value: 'mysql' },
        { name: '暂不配置', value: '' },
      ],
      default: 'mysql',
      prefix: '*',
      when: (answers) => answers.serverFramework !== ServerFrameworks.Skip
    },
    {
      type: 'input',
      name: 'host',
      message: '请输入数据库地址：',
      default: 'localhost',
      prefix: '*',
      when: (answers) => answers.dialect
    },
    {
      type: 'input',
      name: 'port',
      message: '请输入数据库端口：',
      default: 3306,
      prefix: '*',
      when: (answers) => answers.host
    },
    {
      type: 'input',
      name: 'database',
      message: '请输入数据库名称：',
      prefix: '*',
      validate: (input: string) => Boolean(input),
      when: (answers) => answers.host
    },
    {
      type: 'input',
      name: 'username',
      message: '请输入登录用户名：',
      default: 'root',
      prefix: '*',
      when: (answers) => answers.host
    },
    {
      type: 'password',
      name: 'password',
      message: '请输入密码：',
      prefix: '*',
      when: (answers) => answers.host
    },
  ]
  return inquirer.prompt(question);
};
/**
 * 同步创建服务端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createServerSync = (answers: ProjectInfo) => {
  const { serverFramework, dialect } = answers;
  // 复制服务端相关目录
  const serverFrom = utils.getTemplatePath(`server/${serverFramework}`);
  const serverTo = utils.getDistPath('server');
  const defaultConfig = { // 在未配置数据库信息时，使用默认值替换ejs模板
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'tiny_pro_server'
  }
  fs.copyTpl(serverFrom, serverTo, dialect ? answers : defaultConfig, {
    overwrite: true,
  });
};

/**
 * 同步创建客户端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createProjectSync = (answers: ProjectInfo) => {
  const { framework, description, name, serverFramework } = answers;
  const templatePath =
    framework === VUE_TEMPLATE_PATH ? VUE_TEMPLATE_PATH : NG_TEMPLATE_PATH;

  // 模板来源目录
  const from = utils.getTemplatePath(templatePath);
  // 复制模板的目标目录
  const to = utils.getDistPath(serverFramework ? 'web' : '');

  fs.copyTpl(from, to);
  // 将项目名称、描述写入 package.json中
  try {
    const packageJsonPath = path.join(to, 'package.json');
    const writeOrReadOptions = { encoding: 'utf8' } as const;
    let packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, writeOrReadOptions)
    );
    packageJson = { ...packageJson, name, description };
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      writeOrReadOptions
    );

    // 如果不对接服务端，默认开启mock
    if (!serverFramework) {
      try {
        const envPath = path.join(to, '.env');
        const envConfig = dotenv.parse(
          fs.readFileSync(envPath, writeOrReadOptions)
        );
        envConfig.VITE_USE_MOCK = 'true';
        const config = Object.keys(envConfig)
          .map((key) => `${key} = ${envConfig[key]}`)
          .join('\n');
        fs.writeFileSync(envPath, config);
      } catch (e) {
        log.error('开启mock模式失败');
        log.error('请手动配置env信息');
        throw (e)
      }
    } else {
      // 如果对接服务端，执行文件复制及相关配置
      serverFramework && createServerSync(answers);
    }
  } catch (e) {
    log.error('配置项目信息创失败');
    log.debug(e);
    throw (e);
  }
};

// 安装依赖
export const installDependencies = (answers: ProjectInfo) => {
  const prefix = cliConfig.getBinName();
  // egg服务端 安装依赖并启动
  if (answers.serverFramework === ServerFrameworks.EggJs) {
    log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
    spawn.sync('npm', ['install'], {
      cwd: 'server/',
      stdio: 'inherit',
    });
    log.success('npm 依赖安装成功');
  }
  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  spawn.sync('npm', ['install'], {
    cwd: answers.serverFramework ? 'web/' : null,
    stdio: 'inherit',
  });

  log.success('npm 依赖安装成功');

  /* prettier-ignore-start */
  console.log(
    chalk.yellow(
      '\n--------------------初始化成功,请按下面提示进行操作--------------------\n'
    )
  );
  console.log(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} start`)}         # 可一键开启项目开发环境`
    )
  );
  console.log(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} help`)}          # 可查看当前套件的详细帮助`
    )
  );
  console.log(
    chalk.green(
      `\n建议将现有初始化的代码提交一次到master分支, 方便后续切换到 ${chalk.yellow(
        'daily/x.y.z'
      )} 分支进行开发`
    )
  );
  console.log(
    chalk.yellow(
      '\n-------------------- 技术支持：官方小助手微信opentiny-official --------------------\n'
    )
  );
};

export default async () => {
  // 拷贝模板到当前目录
  let projectInfo: ProjectInfo;

  try {
    // 创建项目文件夹及文件
    projectInfo = await getProjectInfo();
    createProjectSync(projectInfo);
  } catch (e) {
    log.error('项目模板创建失败');
    log.debug(e);
    throw e;
  }

  // 安装依赖
  try {
    installDependencies(projectInfo);
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error('请手动执行 tiny i 或 npm i');
    log.debug(e);
    throw e;
  }
};
