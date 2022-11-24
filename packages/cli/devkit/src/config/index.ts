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
import * as fs from "fs";
import * as path from "path";
import Intl from "../intl/index";
import logs from "../log/index";
import message from "./locale";
import astAnalyze from './ast-analyze';
import { PROCESS_ENV_CONFIG_FILE, DEFAULT_CONFIG_FILE, PROCESS_ENV_CONFIG_PATH } from "../cli-config/index"

const log = logs("core-config");
const CWD = process.cwd();

/**
* 获取配置文件的名称
* @return {string}
*/
export function getConfigName(): string {
  return process.env[PROCESS_ENV_CONFIG_FILE] || DEFAULT_CONFIG_FILE;
}

/**
 * 获取config.js的文件路径
 */
export function getConfigPath() {
  return process.env[PROCESS_ENV_CONFIG_PATH] || CWD;
}

/**
* 当前目录下是否存在tiny.config.js文件
* @param {string} dir 需要判断文件是否存在的目录,可选,默认取值:当前运行目录
*/
export function exist(dir?: string): boolean {
  const cwd = dir || getConfigPath();
  const configPath = path.join(cwd, getConfigName());
  return fs.existsSync(configPath);
}

/**
* 获取整个pi.config.js文件的内容
*/
export function getAll(dir: string) {
  const cwd = dir || getConfigPath();
  const configName = getConfigName();
  // 先判断文件是否存在,存在的话才读取
  if (!exist(cwd)) {
    return null;
  }
  // 直接使用require的话,会有缓存， 需要先删除 require 的缓存
  const configPath = path.join(cwd, configName);
  delete require.cache[configPath];
  try {
    const file = require(configPath);
    log.debug("get %s , file = %o", configName, file);
    return file;
  } catch (e) {
    const intl = new Intl(message);
    log.error(intl.get("readConfigError", { file: configName }));
    log.error(intl.get("moreDetail"));
    log.error(e && e.stack);
    return process.exit(1);
  }
}

/**
* 根据key获取tiny.config.js的单个对象
* @param key 配置的键名
* @param dir 配置文件的路径
* @return object
*/
export function get(key: string, dir?: string) {
  const file = this.getAll(dir);
  log.debug("key = %s ,all config = %o", key, file);
  return file ? file[key] : null;
}

/**
   * 获取套件的名字
   */
export function getToolkitName(dir?: string): string | null {
  const config = this.getAll(dir || "");
  if (config && config.toolkit) {
    return config.toolkit;
  }
  return null;
}

/**
   * 设置tiny.config.js的属性值,写入相关内容
   * @param key tiny.config.js中的key
   * @param value key对应的value
   * @param dir 配置文件路径
   */
export function set(key: string, value: any, dir?: string) {
  const cwd = dir || getConfigPath();
  const configName = getConfigName();
  const filePath = path.join(cwd, configName);
  // 读取文件
  const code = fs.readFileSync(filePath, 'utf8');
  const source = astAnalyze(code, key, value);
  log.debug('set %s file source string = %o', configName, source);
  fs.writeFileSync(filePath, source);
}

export default {
  exist,
  set,
  get,
  getAll,
  getConfigName,
  getConfigPath,
  getToolkitName
}