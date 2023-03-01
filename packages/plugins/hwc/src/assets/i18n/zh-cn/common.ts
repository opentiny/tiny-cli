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
import { cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import { CONSTANTS } from '../../../core';

export const commonMsg = {
  // 此项不能为空, 提示请输入xx
  commonTermEmptyWarnMsg: (input) => `请输入${input}`,
  commonTermFmtErrMsg: (input) => `${input}格式错误`,
  commonTermLengthWarnMsg: (min, max) => `长度范围为${min}-${max}。`,
  commonTermIsExist: (obj, name) => `${obj} ${name} 已存在，请重新输入`,
  commandAddNullMsg: (name, command) =>
    `获取${name}为空，请执行${tinyStageCliConfig.getBinName()} ${
      CONSTANTS.TINY_PRO_DEFAULT_BIN
    } ${command} create创建!`,
  commonTermCmdNotSupportMsg: '当前命令不支持，请输入帮助信息中提供的命令',
};
