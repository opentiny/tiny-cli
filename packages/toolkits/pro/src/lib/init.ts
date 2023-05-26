import * as path from 'path';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import inquirer, { QuestionCollection } from 'inquirer';
import { cliConfig, logs, fs, user, modules } from '@opentiny/cli-devkit';
import { InitAnswers } from './interfaces';
import utils from './utils';

const log = logs('tiny-toolkit-pro');
const cwd = process.cwd();
const vueTemplatePath = 'tinyvue';
const ngTemplatePath = 'tinyng';

/**
 * 询问创建项目的描述，使用的技术栈
 *
 * @returns pbject { description: 项目描述,framework: 框架, name: 项目名称 }
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
    },
    {
      type: 'list',
      name: 'useSever',
      message: '是否需要对接服务端：',
      choices: [
        { name: 'Yes', value: true },
        { name: 'Don`t need', value: false },
      ],
      default: true,
    },
  ] as const;

  return inquirer.prompt(question);
};
const severQuestion: Array<any> = [
  {
    type: 'list',
    name: 'severType',
    message: '请选择您希望使用的服务端技术栈：',
    choices: [
      { name: 'Spring Cloud', value: 'springCloud' },
      { name: 'Egg.js', value: 'eggJs' },
      { name: 'Nest.js', value: 'nestJs' },
    ],
    default: 'springCloud',
  },
];
/**
 * 同步创建项目文件目录、文件
 * @answers 询问问题的选择值
 */
const createProjectSync = (answers: InitAnswers) => {
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

  const {
    framework,
    description,
    name: packageJsonName,
    useSever,
    severType,
  } = answers;
  const templatePath =
    framework === vueTemplatePath ? vueTemplatePath : ngTemplatePath;

  // 模板来源目录
  const from = utils.getTemplatePath(templatePath);

  // 复制模板的目标目录
  const to = utils.getDistPath('web');
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
  // 如果对接服务端，复制相关目录
  if (useSever) {
    const severFrom = utils.getTemplatePath(`sever/${severType}`);
    const severTo = utils.getDistPath('sever');
    fs.copyTpl(severFrom, severTo);
  }
  // 将项目名称、描述写入 package.json中
  {
    const packageJsonPath = path.join(to, 'package.json');
    const writeOrReadOptions = { encoding: 'utf8' } as const;

    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, writeOrReadOptions)
    );
    packageJson.name = packageJsonName;
    packageJson.description = description;

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      writeOrReadOptions
    );
  }
};

// 安装依赖
export const installDependencies = () => {
  const prefix = cliConfig.getBinName();

  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  spawn.sync('npm', ['install'], { cwd: 'web/', stdio: 'inherit' });

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
  try {
    // 创建项目文件夹及文件
    const baseAnswers = await getInitAnswers();
    let severAnswer: Object = {};
    if (baseAnswers.useSever)
      severAnswer = await inquirer.prompt(severQuestion);
    const answers = Object.assign(baseAnswers, severAnswer);
    createProjectSync(answers);
  } catch (e) {
    log.error('项目模板创建失败');
    log.debug(e);
    throw e;
  }
  // 安装依赖
  try {
    installDependencies();
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error('请手动执行 tiny i 或 npm i');
    log.debug(e);
    throw e;
  }
};
