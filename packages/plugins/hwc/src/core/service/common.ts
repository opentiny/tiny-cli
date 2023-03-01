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
import { get, set } from 'lodash';
import chalk from 'chalk';
import {
  logs,
  fs,
  cliConfig as tinyStageCliConfig,
} from '@opentiny/cli-devkit';
import { CONSTANTS } from '../config/constants';
import { getHwcExportsPath } from '../config';
import { commonMsg } from '../../assets/i18n';
import help from '../../lib/help';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-common`
);

export const fmtDashTitle = (msg) =>
  `--------------------${msg}--------------------\n`;

/** 延时函数 */
export function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n);
  });
}

// 选择列表中显示的字符串超长时统一处理
// 长度小于len补充空格，长度大于len截断显示并在字符串末尾增加...
export const ellipsis = (str: string, len: number) => {
  let result = '';
  if (str.length >= len) {
    result = `${str.slice(0, len - 3)}...`;
  } else {
    result = str.padEnd(len, ' ');
  }

  return result;
};

export const isHwcExportsExists = () => {
  const hwcExportsFilePath = getHwcExportsPath();

  return fs.existsSync(hwcExportsFilePath);
};

export const setHwcExports = (_path: string, value: any) => {
  const hwcExportsFilePath = getHwcExportsPath();

  if (!isHwcExportsExists()) {
    fs.writeFileSync(hwcExportsFilePath, '{"hwcConfig": {}}', {
      encoding: 'utf8',
    });
  }

  try {
    const hwsExportsFileContent = JSON.parse(
      fs.readFileSync(hwcExportsFilePath, { encoding: 'utf8' })
    );

    set(hwsExportsFileContent, _path, value);
    fs.writeFileSync(
      hwcExportsFilePath,
      JSON.stringify(hwsExportsFileContent, null, 2),
      { encoding: 'utf8' }
    );
  } catch (error) {
    log.error(error);
  }
};

export const getHwcExports = (_path: string) => {
  const hwcExportsFilePath = getHwcExportsPath();

  if (!isHwcExportsExists()) {
    return;
  }

  try {
    const hwsExportsFileContent = JSON.parse(
      fs.readFileSync(hwcExportsFilePath, { encoding: 'utf8' })
    );

    return get(hwsExportsFileContent, _path);
  } catch (error) {
    log.error(error);
  }
};

export const showHelpInfo = (
  cmdName: string,
  availableCmds: Array<string> = ['add', 'create']
) => {
  if (availableCmds.includes(cmdName)) {
    return;
  }

  console.log(`${chalk.magenta(commonMsg.commonTermCmdNotSupportMsg)}`);
  help();
};
