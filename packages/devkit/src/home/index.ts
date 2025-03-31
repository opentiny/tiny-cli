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
import Debug from 'debug';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as del from 'del';
import * as os from 'os';
import rimraf from 'rimraf';
import { PROCESS_ENV_HOME_PATH, PROCESS_ENV_HOME_FOLDE, DEFAULT_HOME_FOLDER } from '../cli-config/index';

const debug = Debug('core-home');

let userHomeFolder = '';
let userHomePath = '';

/**
 * 获取cli的home路径
 * TINY_HOME_FOLDER 作用：可以自定义tiny的核心目录，方便开发第三方cli工具进行定制
 * TINY_HOME 作用：方便单元测试时更改目录结构
 * @returns {string} 返回路径字符串
 */
export function getHomePath(): string {
  userHomeFolder = process.env[PROCESS_ENV_HOME_FOLDE] || DEFAULT_HOME_FOLDER;
  userHomePath = process.env[PROCESS_ENV_HOME_PATH] || os.homedir();
  return path.resolve(userHomePath, userHomeFolder);
}

/**
 * 获取cli模块的安装路径
 * @returns {string} 返回路径字符串
 */
export function getModulesPath(): string {
  const cliPath = getHomePath();
  const modulesPath = path.resolve(cliPath, 'node_modules');
  debug('tiny module path = %s', modulesPath);
  return modulesPath;
}

/**
 * 初始化home目录,并将信息缓存至process.env中
 */
export function initHomeDir(): void {
  const cliPath = getHomePath();
  if (!fs.existsSync(cliPath)) {
    fs.mkdirsSync(cliPath);
  }
  // 缓存home信息到env里面
  if (!process.env[PROCESS_ENV_HOME_FOLDE]) {
    process.env[PROCESS_ENV_HOME_FOLDE] = userHomeFolder;
  }
  if (!process.env[PROCESS_ENV_HOME_PATH]) {
    process.env[PROCESS_ENV_HOME_PATH] = userHomePath;
  }
}

export interface clearResult {
  success: boolean;
  removePath: string;
}

/**
 * 清理Home目录内容
 * 用户手工删除是没影响的，tiny会验证并初始化
 * 返回删除成功与否
 */
export function cleanHomeDir(): clearResult {
  const homePath = getHomePath();
  const cliModulesPath = getModulesPath();
  const result: clearResult = {
    success: true,
    removePath: cliModulesPath
  };
  if (fs.existsSync(cliModulesPath)) {
    // 清除tiny.*.json的配置文件
    const paths = del.sync([`tiny.*.json`, `package.json`, `*.yaml`, 'package-lock.json'], {
      cwd: homePath
    });
    debug('clear tiny.*.json = %o', paths);
    //  windows下可能存在路径过长无法清除的情况，报错后提示手动删除
    try {
      rimraf.sync(cliModulesPath);
    } catch (e) {
      result.success = false;
      console.error(`${cliModulesPath} 删除失败，请手动删除该文件夹！`);
    }
    debug('remove tiny modules path = %s', cliModulesPath);
  }
  return result;
}

export const EntryModuleEnv = 'TINY_ENTRY_MODULE';

export default {
  getHomePath,
  getModulesPath,
  initHomeDir,
  cleanHomeDir,
  EntryModuleEnv
};
