/**
 * Copyright (c) 2022 - present TinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
// 忽略证书和warning相关信息的输出
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.env['NODE_NO_WARNINGS'] = '1';
/**
 * cli 多语言文案文件
 */
export const FILE_LOCALE = 'tiny.locale.json';

/**
 * cli 多语言文案文件
 */
export const FILE_CACHE = 'tiny.cache.json';

/**
 * cli 环境设置
 */
export const FILE_ENV = 'tiny.env.json';

/**
 * cli所需的项目配置文件
 */
export const DEFAULT_CONFIG_FILE = 'tiny.config.js';

/**
 * cli所需的项目配置文件
 */
export const FILE_USER = 'tiny.user.json';

/**
 * cli默认的根目录文件夹
 */
export const DEFAULT_HOME_FOLDER = '.tiny';

/**
 * cli运行命令名称
 */
export const DEFAULT_BIN = 'tiny';

/**
 * 项目scope
 */
export const DEFAULT_SCOPE = 'opentiny';

/**
 * process.env 中的locale设置
 */
export const PROCESS_ENV_LOCALE = 'TINY_LOCALE';

/**
 * process.env 中 cli的根目录所在的路径
 */
export const PROCESS_ENV_HOME_PATH = 'TINY_HOME_PATH';

/**
 * process.env 中 cli的根目录文件夹名称
 */
export const PROCESS_ENV_HOME_FOLDE = 'TINY_HOME_FOLDER';

/**
 * process.env 中 记录的cli配置文件名称key
 */
export const PROCESS_ENV_CONFIG_FILE = 'TINY_CONFIG_FILE';

/**
 * process.env 中 记录的cli配置文件路径key
 */
export const PROCESS_ENV_CONFIG_PATH = 'TINY_CONFIG_PATH';

/**
 * process.env 中记录cli当前环境的key
 */
export const PROCESS_ENV_CLI_ENV = 'TINY_ENV';

/**
 * process.env 中 记录的cli命令名称key
 */
export const PROCESS_ENV_BIN = 'TINY_BIN';

/**
 * process.env 中 记录项目scope的key
 */
export const PROCESS_ENV_SCOPE = 'TINY_SCOPE';

/**
 * process.env 中 记录的cli version key
 */
export const PROCESS_ENV_CLI_VERSION = 'TINY_VERSION';

/**
 * process.env 中 记录的cli name key
 */
export const PROCESS_ENV_CLI_PACKAGE = 'TINY_PACKAGE';

/**
 * process.env 中 记录用户在控制台输入的真实命令
 */
export const PROCESS_ENV_MODULE_ENTRY = 'TINY_MODULE_ENTRY';

/**
 * process.env 中记录当前cli的运行环境，可选的值有Node/FUXI
 */
export const PROCESS_ENV_RUN = 'TINY_RUN_ENV';

/**
 * CLI当前的运行环境
 */
export enum ENV_RUN {
  NONE = 'none',
  FUXI = 'fuxi' // TODO
}

/**
 * 获取运行时的TINY命令
 */
export function getBinName(): string {
  return process.env[PROCESS_ENV_BIN] || DEFAULT_BIN;
}

/**
 * 获取项目scope
 */
export function getScope(): string {
  return process.env[PROCESS_ENV_SCOPE] || DEFAULT_SCOPE;
}

/**
 *
 * @param name
 */
export function setModuleEntry(name: string): void {
  process.env[PROCESS_ENV_MODULE_ENTRY] = name;
}

export function getModuleEntry(): string {
  return process.env[PROCESS_ENV_MODULE_ENTRY] || '';
}

export default {
  FILE_CACHE,
  FILE_ENV,
  FILE_LOCALE,
  FILE_USER,
  PROCESS_ENV_BIN,
  PROCESS_ENV_SCOPE,
  PROCESS_ENV_CLI_ENV,
  PROCESS_ENV_CONFIG_FILE,
  PROCESS_ENV_CONFIG_PATH,
  PROCESS_ENV_HOME_FOLDE,
  PROCESS_ENV_HOME_PATH,
  PROCESS_ENV_LOCALE,
  PROCESS_ENV_CLI_VERSION,
  PROCESS_ENV_CLI_PACKAGE,
  PROCESS_ENV_RUN,
  ENV_RUN,
  getScope,
  getBinName,
  getBinName1: getBinName,
  getModuleEntry,
  setModuleEntry,
  DEFAULT_BIN,
  DEFAULT_SCOPE,
  DEFAULT_CONFIG_FILE,
  DEFAULT_HOME_FOLDER
};
