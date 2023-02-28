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
import chalk from 'chalk';
import { cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import { CONSTANTS } from '../../../core';

export const configureMsg = {
  cfgTermName: '名称',
  cfgTermWriteAkSkError: '写入AK/SK出现错误',
  cfgTermInfo: '配置信息',
  cfgTermGetError: (config) =>
    `系统未检测到 ${chalk.yellow(config)}，请先执行 ${chalk.yellow(
      `${tinyStageCliConfig.getBinName()} ${
        CONSTANTS.TINY_PRO_DEFAULT_BIN
      } configure`
    )} 命令完成初始化`,
  cfgTermWriteHwcError: `写AK/SK内容出错`,
  cfgTermAddGitIgnoreError: `.gitignore文件添加出错`,
  cfgTermProjectId: '项目ID',
  cfgTermInputProjectIdMsg: '请输入项目ID：',
  cfgTermSelectProjectIdMsg: '请选择项目ID：',
  cfgTermBeginMsg:
    '开始初始化配置, 其中"Secret Access Key"输入内容匿名化处理, 请按下面提示进行操作',
  cfgTermInputAkMsg: '请输入Access Key ID：',
  cfgTermInputSkMsg: '请输入Secret Access Key：',
  cfgTermSelectRegion: '请选择Region：',
  cfgTermResultSuccessMsg: '配置成功！',
  cfgTermResultErrMsg: '配置失败',
  cfgTermReCfgMsg: '配置文件已存在，继续操作将会覆盖当前配置，是否继续？',
};
