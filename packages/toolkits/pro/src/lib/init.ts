import * as path from 'path';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import * as dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import inquirer, { QuestionCollection } from 'inquirer';
import { cliConfig, logs, fs } from '@opentiny/cli-devkit';
import { ProjectInfo, ServerFrameworks } from './interfaces';
import utils from './utils';

const log = logs('tiny-toolkit-pro');
const VUE_TEMPLATE_PATH = 'tinyvue';
const NG_TEMPLATE_PATH = 'tinyng';
const DEFAULT_PROJECT_NAME = 'tiny-pro';

/**
 * 询问创建项目的描述，使用的技术栈
 *
 * @returns object { description: 项目描述,framework: 框架, name: 项目名称 ,serverFramework:使用技术栈, dialect：数据库，DB_host:数据库地址，DB_port:数据库端口，database：数据库名称，username：数据库用户名，password：数据库密码，}
 */
const getProjectInfo = (): Promise<ProjectInfo> => {
  const question: QuestionCollection<ProjectInfo> = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称：',
      default: DEFAULT_PROJECT_NAME,
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
        { name: '暂不配置', value: ServerFrameworks.Skip },
      ],
      default: ServerFrameworks.Skip,
      prefix: '*',
      when: (answers) => answers.framework === VUE_TEMPLATE_PATH,
    },
    {
      type: 'list',
      name: 'serverConfirm',
      message:
        '请确保已安装数据库服务（参考文档 https://www.opentiny.design/tiny-cli/docs/toolkits/pro#database）：',
      choices: [
        { name: '已完成数据库服务安装，开始配置', value: true },
        { name: '暂不配置服务端', value: false },
      ],
      prefix: '*',
      when: (answers) => answers.serverFramework !== ServerFrameworks.Skip,
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
      when: (answers) => answers.serverConfirm,
    },
    {
      type: 'input',
      name: 'host',
      message: '请输入数据库地址：',
      default: 'localhost',
      prefix: '*',
      when: (answers) => answers.dialect,
    },
    {
      type: 'input',
      name: 'port',
      message: '请输入数据库端口：',
      default: 3306,
      prefix: '*',
      when: (answers) => answers.host,
    },
    {
      type: 'input',
      name: 'database',
      message: '请输入数据库名称：',
      prefix: '*',
      validate: (input: string) => Boolean(input),
      when: (answers) => answers.host,
    },
    {
      type: 'input',
      name: 'username',
      message: '请输入登录用户名：',
      default: 'root',
      prefix: '*',
      when: (answers) => answers.host,
    },
    {
      type: 'password',
      name: 'password',
      message: '请输入密码：',
      prefix: '*',
      when: (answers) => answers.host,
    },
  ];
  return inquirer.prompt(question);
};

/**
 * 创建数据库、表、并插入一条用户(admin)数据
 * @answers 询问客户端问题的选择值
 */
const createDatabase = async (answers: ProjectInfo) => {
  const {
    name,
    dialect,
    host,
    port,
    database,
    username,
    password,
    serverFramework,
  } = answers;
  if (!dialect) return;

  log.info('开始连接数据库服务...');
  const connection = await mysql.createConnection({
    host,
    port,
    user: username,
    password,
    multipleStatements: true,
  });

  // 连接数据库服务
  await connection.connect();
  log.info(`连接成功，准备创建数据库（${database}）和用户数据表...`);

  // 新建数据库
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
  await connection.query(` USE ${database}`);

  // 读取sql文件、新建表
  const serverPath = utils.getDistPath(`${name}/server`);
  let databaseSqlDir = '';
  switch (serverFramework) {
    case ServerFrameworks.EggJs:
      databaseSqlDir = path.join(serverPath, 'app/database');
      break;
    case ServerFrameworks.SpringCloud:
      databaseSqlDir = path.join(
        serverPath,
        'server/src/main/resources/database'
      );
      break;
    default:
      break;
  }

  const tableSqlDirPath = path.join(databaseSqlDir, 'table');
  const files = fs.readdirSync(tableSqlDirPath);
  for (const file of files) {
    if (/\.sql$/.test(file)) {
      const sqlFilePath = path.join(tableSqlDirPath, file);
      const createTableSql = fs.readFileSync(sqlFilePath).toString();
      await connection.query(createTableSql);
    }
  }
  log.info(
    '创建成功，开始写入初始用户数据（账号：admin@example.com  密码：admin）...'
  );

  // 插入初始用户数据
  const createUserSqlPath = path.join(databaseSqlDir, 'createuser.sql');
  const createUserSql = fs.readFileSync(createUserSqlPath).toString();
  await connection.query(createUserSql);
  log.success('数据库初始化成功！');

  // 断开连接
  await connection.end();
};

/**
 * 同步创建服务端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createServerSync = (answers: ProjectInfo) => {
  const { name, serverFramework, dialect } = answers;
  // 复制服务端相关目录
  const serverFrom = utils.getTemplatePath(`server/${serverFramework}`);
  const serverTo = utils.getDistPath(`${name}/server`);
  const defaultConfig = {
    // 在未配置数据库信息时，使用默认值替换ejs模板
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'tiny_pro_server',
  };

  fs.copyTpl(serverFrom, serverTo, dialect ? answers : defaultConfig, {
    overwrite: true,
    notTextFile: ['.jar'],
  });
};

/**
 * 同步创建客户端项目文件目录、文件
 * @answers 询问客户端问题的选择值
 * @dbAnswers  询问服务端配置的选择值
 */
const createProjectSync = (answers: ProjectInfo) => {
  const { framework, description, name, serverConfirm } = answers;
  const templatePath =
    framework === VUE_TEMPLATE_PATH ? VUE_TEMPLATE_PATH : NG_TEMPLATE_PATH;

  // 模板来源目录
  const from = utils.getTemplatePath(templatePath);
  // 复制模板的目标目录
  const to = utils.getDistPath(serverConfirm ? `${name}/web` : name);

  fs.copyTpl(from, to);
  // 将项目名称、描述写入 package.json中
  try {
    const packageJsonPath = path.join(to, 'package.json');
    let packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, { encoding: 'utf8' })
    );
    packageJson = { ...packageJson, name, description };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
      encoding: 'utf8',
    });
  } catch (e) {
    log.error('配置项目信息创失败');
  }

  // 如果不对接服务端，全部接口采用mock
  if (!serverConfirm) {
    try {
      const envPath = path.join(to, '.env');
      const envConfig = dotenv.parse(
        fs.readFileSync(envPath, { encoding: 'utf8' })
      );
      delete envConfig.VITE_MOCK_IGNORE;
      const config = Object.keys(envConfig)
        .map((key) => `${key} = ${envConfig[key]}`)
        .join('\n');
      fs.writeFileSync(envPath, config);
    } catch (e) {
      log.error('开启mock模式失败');
      log.info('请手动配置env信息');
    }
  } else {
    // 如果对接服务端，执行文件复制及相关配置（ WIP: 后台接口暂未全量完成，部分接口还是使用mock ）
    createServerSync(answers);
  }
};

// 安装依赖
export const installDependencies = (answers: ProjectInfo) => {
  const prefix = cliConfig.getBinName();
  const { name, serverFramework, serverConfirm } = answers;
  // egg服务端 安装依赖并启动
  if (serverConfirm && serverFramework === ServerFrameworks.EggJs) {
    log.info('正在安装服务端 npm 依赖，安装过程需要几十秒，请耐心等待...');
    spawn.sync('npm', ['install'], {
      cwd: `${name}/server/`,
      stdio: 'inherit',
    });
    log.success('服务端 npm 依赖安装成功');
  }
  // npm 依赖安装
  log.info('正在安装客户端 npm 依赖，安装过程需要几十秒，请耐心等待...');
  spawn.sync('npm', ['install'], {
    cwd: serverConfirm ? `${name}/web` : `${name}/`,
    stdio: 'inherit',
  });
  log.success('客户端 npm 依赖安装成功');

  /* prettier-ignore-start */
  console.log(
    chalk.yellow(
      '\n--------------------初始化成功,请按下面提示进行操作--------------------\n'
    )
  );

  if (serverConfirm) {
    console.log(
      chalk.green(
        `${chalk.yellow(
          `$ cd ${name}/web && npm run start`
        )}     # 开启web开发环境`
      )
    );
    console.log(
      chalk.green(
        `${chalk.yellow(
          `$ cd ${name}/server && npm run dev`
        )}    # 开启server开发环境`
      )
    );
  } else {
    console.log(
      chalk.green(
        `${chalk.yellow(
          `$ cd ${name} && ${prefix} start`
        )}         # 可一键开启项目开发环境`
      )
    );
  }

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
    return;
  }

  // 初始化数据库
  try {
    await createDatabase(projectInfo);
  } catch (e) {
    log.error(
      '数据库初始化失败，请确认数据库配置信息正确并手动初始化数据库' + e
    );
  }

  // 安装依赖
  try {
    installDependencies(projectInfo);
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.info('请手动执行 tiny i 或 npm i');
  }
};
