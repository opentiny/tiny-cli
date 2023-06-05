import * as path from 'path';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import inquirer, { QuestionCollection } from 'inquirer';
import { cliConfig, logs, fs, user, modules } from '@opentiny/cli-devkit';
import { InitAnswers, DBAnswers } from './interfaces';
import utils from './utils';
import * as dotenv from 'dotenv';
dotenv.config();

const log = logs('tiny-toolkit-pro');
const cwd = process.cwd();
const vueTemplatePath = 'tinyvue';
const ngTemplatePath = 'tinyng';

/**
 * 询问创建项目的描述，使用的技术栈
 *
 * @returns object { description: 项目描述,framework: 框架, name: 项目名称 ,serverType:使用技术栈}
 */
const getInitAnswers = (): Promise<InitAnswers> => {
  const basename = path.basename(utils.getDistPath());
  const question: QuestionCollection<InitAnswers> = [
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
        { name: 'vue', value: vueTemplatePath },
        { name: 'angular', value: ngTemplatePath },
      ],
      default: vueTemplatePath,
      prefix: '*',
    },
    {
      type: 'list',
      name: 'serverType',
      message: '请选择您希望使用的服务端技术栈：',
      choices: [
        { name: 'Egg.js', value: 'eggJs' },
        { name: 'Spring Cloud', value: 'springCloud' },
        { name: 'Nest.js', value: 'nestJs' },
        { name: '跳过', value: false },
      ],
      default: 'eggJs',
      prefix: '*',
    },
  ] as const;

  return inquirer.prompt(question);
};
/**
 * DB配置
 *
 * @returns object { dialect：数据库，DB_host:数据库地址，DB_port:数据库端口，database：数据库名称，username：数据库用户名，password：数据库密码，}
 */
const getDBType = (): Promise<DBAnswers> => {
  const question: QuestionCollection<DBAnswers> = {
    type: 'list',
    name: 'dialect',
    message: '请选择数据库类型：',
    choices: [
      { name: 'mySQL', value: 'mysql' },
      { name: '跳过', value: false },
    ],
    default: 'mysql',
    prefix: '*',
  };

  return inquirer.prompt(question);
};
const getDBConfig = (): Promise<DBAnswers> => {
  const question: QuestionCollection<DBAnswers> = [
    {
      type: 'input',
      name: 'host',
      message: '请输入数据库地址：',
      default: 'localhost',
      prefix: '*',
    },
    {
      type: 'input',
      name: 'port',
      message: '请输入数据库端口：',
      default: '3306',
      prefix: '*',
    },
    {
      type: 'input',
      name: 'database',
      message: '请输入数据库名称：',
      prefix: '*',
    },
    {
      type: 'input',
      name: 'username',
      message: '请输入登录用户名：',
      default: 'root',
      prefix: '*',
    },
    {
      type: 'password',
      name: 'password',
      message: '请输入密码：',
      prefix: '*',
    },
  ] as const;

  return inquirer.prompt(question);
};
/**
 * 同步创建服务端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createServerSync = (answers: InitAnswers, dbAnswers: DBAnswers) => {
  const { serverType } = answers;

  // 复制服务端相关目录
  const serverFrom = utils.getTemplatePath(`server/${serverType}`);
  const serverTo = utils.getDistPath('server');
  fs.copyTpl(serverFrom, serverTo);

  // 如果命令行配置数据库，写入config
  if (dbAnswers.dialect && serverType === 'eggJs') {
    const eggConfigPath = path.join(serverTo, 'app/database/db.config.json');
    const writeOrReadOptions = { encoding: 'utf8' } as const;
    const eggConfig = JSON.parse(
      fs.readFileSync(eggConfigPath, writeOrReadOptions)
    );
    const dbConfig = Object.assign(eggConfig, dbAnswers);
    fs.writeFileSync(
      eggConfigPath,
      JSON.stringify(dbConfig),
      writeOrReadOptions
    );
  }
};
/**
 * 同步创建客户端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createProjectSync = (answers: InitAnswers, dbAnswers: DBAnswers) => {
  const prefix = cliConfig.getBinName();

  // 当前项目名称集合
  const dirName = cwd.split(path.sep).pop() as string;
  const names = utils.generateNames(dirName);
  const fullName = modules.utils.toolkitFullName(dirName);

  const data = {
    ...user.get(),
    ...names,
    // 完整的插件名称 ， 如 tiny-plugin-npm
    pluginName: fullName.replace('@opentiny/', ''),
    // tslint:disable-next-line
    prefix,
    pluginShortName: dirName,
    pluginFullname: fullName,
  };

  const { framework, description, name: packageJsonName, serverType } = answers;
  const templatePath =
    framework === vueTemplatePath ? vueTemplatePath : ngTemplatePath;

  // 模板来源目录
  const from = utils.getTemplatePath(templatePath);

  // 复制模板的目标目录
  const to = utils.getDistPath(serverType ? 'web' : '');
  // 项目名称，跟当前目录保持一致

  fs.copyTpl(from, to, data, {
    // 改一下名称，兼容其他cli工具的情况
    rename(filename: string) {
      if (filename === 'tiny.config.js') {
        // tslint:disable-next-line: no-parameter-reassignment
        filename = `${prefix}.config.js`;
      }

      return filename;
    },
  });
  // 将项目名称、描述写入 package.json中
  {
    const packageJsonPath = path.join(to, 'package.json');
    const writeOrReadOptions = { encoding: 'utf8' } as const;

    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, writeOrReadOptions)
    );
    packageJson.name = packageJsonName;
    packageJson.description = description;

    // 如果不对接服务端，默认开启mock
    if (!serverType) {
      const envPath = path.join(to, '.env');
      const envConfig = dotenv.parse(
        fs.readFileSync(envPath, writeOrReadOptions)
      );
      envConfig.VITE_USE_MOCK = 'true';
      const config = Object.keys(envConfig)
        .map((key) => `${key} = ${envConfig[key]}`)
        .join('\n');
      fs.writeFileSync(envPath, config);
    }

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      writeOrReadOptions
    );
  }
  // 如果对接服务端，执行文件复制及相关配置
  serverType && createServerSync(answers, dbAnswers);
};

// 安装依赖
export const installDependencies = (answers: InitAnswers) => {
  const prefix = cliConfig.getBinName();

  // egg服务端 安装依赖并启动
  if (answers.serverType === 'eggJs') {
    log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
    spawn.sync('npm', ['install'], {
      cwd: 'server/',
      stdio: 'inherit',
    });
    log.success('npm 依赖安装成功');
    // spawn.sync('npm', ['run','dev'], {
    //   cwd: 'server/',
    //   stdio: 'inherit',
    // });
    // log.success('服务已启动 ...');
  }

  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  spawn.sync('npm', ['install'], {
    cwd: answers.serverType ? 'web/' : null,
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
  let answers: any = {};
  let DBAnswers: any = {};
  let DBConfig: any = {};

  try {
    // 创建项目文件夹及文件
    answers = await getInitAnswers();
    if (answers.serverType) DBAnswers = await getDBType();
    if (DBAnswers.dialect) DBConfig = await getDBConfig();

    createProjectSync(answers, { ...DBConfig, ...DBAnswers });
  } catch (e) {
    log.error('项目模板创建失败');
    log.debug(e);
    throw e;
  }

  // 安装依赖
  try {
    installDependencies(answers);
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error('请手动执行 tiny i 或 npm i');
    log.debug(e);
    throw e;
  }
};
