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
