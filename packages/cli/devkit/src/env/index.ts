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
import fs from 'fs-extra';
import * as path from 'path';
import Debug from 'debug';
import home from '../home/index';
import { FILE_ENV, PROCESS_ENV_CLI_ENV } from '../cli-config/index';

const debug = Debug('core-env');
// 定义一个可枚举的环境变量
export enum EnvType {
  Green = 'Green',
  Yellow = 'Yellow',
  Red = 'Red',
  None = 'None'
}

interface CacheEnv {
  env: EnvType;
}

// 缓存env对象
let cacheEnv: CacheEnv | null;

/**
 * 往配置文件(tiny.env.json)写入用户自定义的环境配置
 * @param env
 */
export function set(env: EnvType) {
  home.initHomeDir();
  const envFile = path.join(home.getHomePath(), FILE_ENV);
  const envData = {
    env
  };
  debug('set tiny env data : %o , set tiny to : %s', envData, envFile);
  cacheEnv = null;
  fs.outputJsonSync(envFile, envData);
}

/**
 * 获取当前用户的环境变量
 * 优先判断process.env.TINY_ENV变量
 * @returns {EnvType} 返回可枚举的环境类型
 */
export function get(): EnvType {
  // 如果有环境变量,则优先使用环境变量的值
  const envGlobal = process.env[PROCESS_ENV_CLI_ENV];
  if (envGlobal && EnvType[envGlobal]) return EnvType[envGlobal];

  // 由于该方法调用频繁,在这里使用一个cacheEnv对象做为缓存,避免频繁的IO操作
  let envData: CacheEnv = { env: EnvType.None };
  if (cacheEnv) {
    envData = cacheEnv;
  } else {
    const envFile = path.join(home.getHomePath(), FILE_ENV);
    if (fs.existsSync(envFile)) {
      envData = fs.readJsonSync(envFile);
      cacheEnv = envData;
    }
  }
  if (envData && envData.env && EnvType[envData.env]) {
    return EnvType[envData.env];
  }
  return EnvType.None;
}

/**
 * 判断cli环境配置文件(tiny.env.json)是否存在
 * 可用做cli环境是否已初始化的判断
 * @returns {boolean}
 */
export function has(): boolean {
  const envFile = path.join(home.getHomePath(), FILE_ENV);
  return fs.existsSync(envFile);
}

/**
 * 删除cli环境配置文件(tiny.env.json)
 */
export function remove(): void {
  fs.removeSync(path.join(home.getHomePath(), FILE_ENV));
  cacheEnv = null;
}

export default {
  set,
  get,
  has,
  remove
};
