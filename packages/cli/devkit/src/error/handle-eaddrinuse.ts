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
/**
 * 端口被占用时的错误处理
 */
import logs from '../log/index';
import message from './locale/index';
import chalk from 'chalk';
import Intl from '../intl/index';
import * as os from 'os';

const log = logs('core-error');

function handleSolution(port: any) {
  const isWin = os.type().match(/^Win/);
  const intl = new Intl(message);
  if (!isWin) {
    return chalk.yellow(intl.get('winPidTips', { port }));
  }

  return chalk.yellow(intl.get('macPidTips', { port }));
}

// 处理
export default async function (e: any) {
  if (e.code !== 'EADDRINUSE') {
    return false;
  }

  const match = e.message.match(/listen EADDRINUSE(.*):(\d+)/);

  if (match && match[2]) {
    const port = match[2];
    const intl = new Intl(message);
    log.error(intl.get('helpTips', { port: chalk.green(port), solution: handleSolution(port) }));
    return true;
  }
  return false;
}
