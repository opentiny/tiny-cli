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
import yargs from 'yargs';
import logs from '../log/index';
const argv = yargs.help(false).argv;
const log = logs('core-argv');

export default () => {
  // cli所需的命令
  let command: string;
  // cli命令所需的参数
  let newArgv: string[] = [];

  // 特殊处理一下传入的参数
  // tiny -v 时候的处理
  if (!argv._.concat().pop() && (argv.v || argv.version)) {
    // 没有传入任何参数, 且有 -v 或 --version
    // 如果有传了参数,说明希望看到套件插件的版本,套件插件版本在 all.js 里面进行处理
    command = 'version';
  } else if (argv.help || argv.h) {
    // 执行 tiny -h 或 tiny -help 的时候
    if (argv._.length === 1) {
      // 显示插件帮助信息
      command = argv._[0];
      newArgv = ['help'];
    } else {
      command = 'help';
    }
  } else if (argv._.length === 0) {
    command = 'help';
  } else {
    newArgv = argv._.concat();
    command = newArgv.splice(0, 1).pop() || '';
  }
  log.debug('控制台传入的原始参数:', argv);
  log.debug('即将执行的tiny命令:', command);
  log.debug('tiny命令的参数:', newArgv);

  return {
    command,
    argv: newArgv
  };
};
