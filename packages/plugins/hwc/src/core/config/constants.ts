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
 * 插件运行命令名称
 */
const TINY_PRO_DEFAULT_BIN = 'hwc';

/**
 * cli 默认的根目录文件夹，对应目录C:\Users\xxx\.tiny\hwc
 */
const TINY_PRO_DEFAULT_HOME_FOLDER = 'hwc';

/**
 * 开发者连接华为云服务文件夹
 */
const TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER = 'hwc';

/**
 * 开发者本地配置信息文件夹
 */
const TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER = '.config';

/**
 * 开发者本地配置信息文件
 */
const TINY_PRO_DEFAULT_LOCAL_INFO_FILE = 'local-hwc-info.json';

/**
 * 开发者本地华为云配置
 */
const TINY_PRO_DEFAULT_HWC_EXPORTS = 'hwc-exports.json';

/**
 * 华为云安全组规则默认上限数
 */
export const SECURITY_GROUP_RULE_LIMIT = 50;

// 函数工作流名称正则表达式
export const REG_FG_NAME = /^[a-zA-Z][\w|-]{0,59}$/;
// 函数工作流依赖包名称正则表达式
export const REG_FG_DEP_NAME = /^[a-zA-Z][\w|\-|.]{0,95}$/;
// 大小写字母数字正则表达式
export const REG_LETTER_NUMBER = /[a-zA-Z0-9]/;

export const CONSTANTS = {
  TINY_PRO_DEFAULT_BIN,
  TINY_PRO_DEFAULT_HOME_FOLDER,
  TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER,
  TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER,
  TINY_PRO_DEFAULT_LOCAL_INFO_FILE,
  TINY_PRO_DEFAULT_HWC_EXPORTS,
};
