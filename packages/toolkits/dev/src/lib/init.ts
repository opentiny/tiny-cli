/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import inquirer, { Answer } from 'inquirer';
import chalk from 'chalk';
import * as path from 'path';
import { cliConfig, npm, logs, fs, user, modules } from '@opentiny/cli-devkit';
import spawn from 'cross-spawn';
import link from './link';
import utils from './utils';

const log = logs('tiny-toolkit-dev');
const cwd = process.cwd();

export default async () => {
  const prefix = cliConfig.getBinName();
  // 询问初始化哪种类型的模板
  const answers: Answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '请选择你想要初始化的模板',
      choices: [
        {
          name: `${prefix}套件 ---- 用于生成项目模板`,
          value: 'toolkit',
        },
        {
          name: `${prefix}插件 ---- 用于拓展${prefix}功能`,
          value: 'plugin',
        },
      ],
    },
    {
      type: 'input',
      name: 'name',
      default: path.basename(cwd),
      message: `输入套件/插件名称(${prefix}-toolkit-/${prefix}-plugin- 开头)`,
      validate(value: string, answers: Answer) {
        if (
          answers.type === 'plugin' &&
          value.indexOf(`${prefix}-plugin-`) !== 0
        ) {
          return `${prefix} 插件名称需要 ${prefix}-plugin- 开头`;
        }
        if (
          answers.type === 'toolkit' &&
          value.indexOf(`${prefix}-toolkit-`) !== 0
        ) {
          return `${prefix} 套件名称需要 ${prefix}-toolkit- 开头`;
        }
        return true;
      },
    },
  ]);

  const from = utils.getTemplatePath(answers.type);
  const to = utils.getDistPath();
  const names = utils.generateNames(answers.name);
  const fullName =
    answers.type === 'toolkit'
      ? modules.utils.toolkitFullName(answers.name)
      : modules.utils.pluginFullName(answers.name);
  const pluginName = fullName.replace(cliConfig.getScope(), '');
  const pluginShortName =
    answers.type === 'toolkit'
      ? pluginName.replace(modules.utils.toolkitPrefix(), '')
      : pluginName.replace(modules.utils.pluginPrefix(), '');

  const data = {
    ...user.get(),
    ...names,
    prefix,
    // 完整的插件名称 ， 如 tiny-plugin-npm
    pluginName,
    pluginShortName,
    pluginFullname: fullName,
  };

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

  if (answers.type === 'plugin') {
    log.success('插件创建成功');
  } else if (answers.type === 'toolkit') {
    log.success('套件创建成功');
  }

  // 执行软链操作
  link();

  // 判断是否有.git,没有的话 则初始化一下
  if (!fs.existsSync(path.join(cwd, '.git'))) {
    log.info('Initializing git ... ');
    spawn.sync('git', ['init']);
    // 初始化后提交一把
    spawn.sync('git', ['add', '*']);
    spawn.sync('git', ['commit', '-m', `temp: [${prefix} auto] init project`]);
  }

  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  try {
    await npm.installDependencies();
    // 独立安装devkit ，保证该模块使用的是当前最新版本
    await npm.install('@opentiny/cli-devkit', {
      save: true,
    });
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error(`请手动执行 ${prefix} i 或 npm i`);
    log.debug(e);
  }
  log.success('npm 依赖安装成功');

  // 执行一下build任务
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
    chalk.yellow(
      `\n--------------------技术支持：官方小助手微信opentiny-official--------------------\n`
    )
  );
};
