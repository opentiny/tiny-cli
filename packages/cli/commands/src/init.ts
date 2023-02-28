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
import { config, Intl, logs, modules, task } from '@opentiny/cli-devkit';
import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer, { Answer } from 'inquirer';
import yargs from 'yargs';
import { getPadding } from './utils';
import message from './locale/index';

const clientOptions = { ...yargs.help(false).argv };

const log = logs('core-commands');
const cwd = process.cwd();

async function runInit(name: string) {
  const module = await modules.getReallyName(name);
  const intl = new Intl(message);
  if (module.exist) {
    const moduleInfo = await modules.get(module.reallyName);
    // es module default export xx.default
    // moduleInfo = modules.getEsModule(moduleInfo);
    // 存在init方法的话，则调用
    if (moduleInfo.init) {
      const init = modules.getEsModule(moduleInfo.init);
      // 去掉 clientOptions 里面多余的字段
      delete clientOptions._;
      delete clientOptions.$0;
      // 执行插件的init方法
      await task.runFunction({
        method: init,
        args: [clientOptions],
      });
    } else {
      log.error(intl.get('notMethod'));
    }
  } else {
    const msg = intl.get('toolkitNotFound', { toolkit: module.reallyName });
    log.error(msg);
  }
}

async function getName() {
  const choices: any[] = [];
  const onlineList = await modules.onlineList({ type: 'toolkit' });
  const localList = modules.localList({ type: 'toolkit' });
  const intl = new Intl(message);
  const onlineMap: any = {};
  const addChoice = (item: any) => {
    const n = item.name.split('-toolkit-')[1];
    const padding = getPadding(n, 15);
    const tmpString = ['  ', chalk.green(n), chalk.gray(padding), item.chName ? item.chName : '暂无描述'].join('');
    choices.push({
      name: tmpString,
      value: item.name,
    });
  };

  onlineList.forEach((item) => {
    addChoice(item);
    onlineMap[item.name] = true;
  });

  localList.forEach((item) => {
    if (!onlineMap[item.name]) {
      addChoice(item);
    }
  });

  // 本地与远程无可用套件时
  if (!onlineList.length && !localList.length) {
    log.error(intl.get('noData'));
    return process.exit(1);
  }

  const answers: Answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: intl.get('toolkitInit'),
      choices,
    },
  ]);
  return answers.name;
}

export default async function (args: string[]) {
  let name = args.pop() || '';
  const intl = new Intl(message);
  if (!name) {
    // 未传入套件名,提示并列出可用套件名
    name = await getName();
  }
  name = modules.utils.toolkitFullName(name);
  // 先判断tiny.config.js 是否存在
  // 存在的话,提示已初始化过了
  // 不存在的话再判断文件夹是否为空
  // 不为空的话则提示覆盖
  if (config.exist(cwd)) {
    log.warn(intl.get('toolkitReportInit'));
    log.warn(intl.get('toolkitInitTips', { file: config.getConfigName() }));
    return;
  }

  // 排除那些以点开头的文件
  const files = fs.readdirSync(cwd).filter((file) => file.indexOf('.') !== 0);

  if (files.length > 0) {
    log.warn(intl.get('fileExist'));
    const questions = [
      {
        type: 'input',
        name: 'check',
        message: intl.get('confirmInit'),
      },
    ];

    const answers: any = await inquirer.prompt(questions);
    if (answers.check === 'y' || answers.check === 'Y') {
      await runInit(name);
    }
  } else {
    await runInit(name);
  }
}
