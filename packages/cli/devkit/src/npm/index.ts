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
import spawn from 'cross-spawn';
import dargs from 'dargs';
import _ from 'lodash';
import axios from 'axios';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import logs from '../log/index';
import cache from '../cache/index';

let cacheConfig: any;
const log = logs('core-npm');
// TIMEOUT 超时时间
const TIMEOUT = 5000;

const defaultRegistries = {
  registry: 'https://registry.npmjs.org/',
  '@opentiny:registry': 'https://registry.npmjs.org'
};

/**
 * 根据不同的环境获取npm地址
 * @param name : 模块名称
 * @returns {string}
 */
export function getRegistry(name?: string): string {
  const config = getCnpmrc();
  name = name || '';
  let scope: string | undefined;
  let registry = config['registry'] || defaultRegistries['registry'];
  if (name[0] === '@') {
    scope = name.slice(0, name.indexOf('/'));
  }
  if (scope) {
    registry = config[`${scope}:registry`] || defaultRegistries[`${scope}:registry`];
  }
  // 需要以 "/" 结尾
  if (registry && !registry.endsWith('/')) {
    registry = `${registry}/`;
  }
  return registry;
}

/**
 * 获取cache配置
 */
function getCacheDir(): string {
  const config = getCnpmrc() || {};
  return config.cache;
}

/**
 * npm install时可传的选项
 * 透传：https://www.npmjs.com/package/npminstall
 */
export interface NpmOption {
  // registry, default is https://registry.npmjs.org
  // specify custom registry
  registry?: string;
  // specify in china, will automatically using chinese npm registry and other binary's mirrors
  china?: boolean;
  stdio?: string;
  cwd?: string;
  root?: string;
  // install to specific directory, default to root
  targetDir?: string;
  // link bin to specific directory (for global install)
  binDir?: string;
  debug?: boolean;
  storeDir?: string;
  // ignore pre/post install scripts, default is `false`
  ignoreScripts?: boolean;
  // forbit install packages which used these licenses
  forbiddenLicenses?: string;
  // proxy
  proxy?: string;
  //  won't install devDependencies
  production?: boolean;
  env?: string;
  detail?: string;
  version?: string;
  save?: boolean;
  'save-dev'?: boolean;
  'save-optional'?: boolean;
  'save-exact'?: boolean;
  S?: boolean;
  D?: boolean;
  O?: boolean;
  E?: boolean;
  [key: string]: string | boolean | undefined;
}

/**
 * 获取cnpmrc配置文件
 */
export function getCnpmrc() {
  if (cacheConfig) return cacheConfig;
  const root = os.homedir();
  const config = {};
  const userConfig = path.join(root, '.cnpmrc');
  if (!fs.existsSync(userConfig)) return {};
  const userConfigContent = fs.readFileSync(userConfig).toString();
  let configs: string[] = [];
  configs = userConfigContent.split('\n');
  configs.reduce((pre, next: any) => {
    if (typeof next === 'string') {
      const map = next.split('=');
      const key = map[0];
      let value: string | boolean = map[1];
      // hugo windows 如果用os.EOL写入的话，会多出\r，需要移除一下，主要是为了兼容windows下换行只有\n的情况
      if (value) {
        value = value.replace('\r', '');
      }
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      pre[key] = value;
    }
    return pre;
  }, config);
  cacheConfig = config;
  return config;
}

/**
 * 将对象写入进npmrc文件
 * @param config npmrc配置文件的内容
 */
export function setCnpmrc(config: any) {
  const base = getCnpmrc();
  const newConfig = { ...base, ...config };
  const root = os.homedir();
  const userConfig = path.join(root, '.cnpmrc');
  // 写入新内容到文件
  const data: any = [];
  Object.keys(newConfig).forEach((item) => {
    data.push(`${item}=${newConfig[item]}`);
  });
  fs.writeFileSync(userConfig, data.join(os.EOL));
}

/**
	 * 安装 npm 包
	 * @param pkg {string|array} 需要安装的包或包列表, 需要带版本号直接在包名后面 @ 版本号即可
			// pkgs: [
			//   { name: 'foo', version: '~1.0.0' },
			// ],
	 * @param options
	 */
export async function install(pkg: string | string[], options?: NpmOption) {
  const installer = 'npminstall';
  await runInstall(installer, pkg, options);
}

/**
 * 移除npm包
 */
export async function unInstall(pkg: string | string[], options?: NpmOption) {
  const installer = 'npmuninstall ';
  await runInstall(installer, pkg, options);
}

/**
 * 安装package.json 中的依赖
 */
export async function installDependencies(options?: NpmOption) {
  const installer = 'npminstall';
  await runInstall(installer, [], options);
}

/**
 * 安装 npm 包
 * @param installer {string} 安装工具路径
 * @param paths {string|array} 需要安装的包或包列表,需要带版本号直接在包名后面 @ 版本号即可, 留空安装当前目录下的 package.json 依赖
 * @param options
 */
export async function runInstall(installer: string, paths: any, options?: NpmOption) {
  const cwd = process.cwd();
  const cacheDir = getCacheDir();
  // npm默认值
  const option = _.defaults(options || {}, {
    stdio: 'inherit',
    registry: getRegistry(),
    cwd,
    china: true
  });

  // 支持cnpmrc设置缓存目录
  if (cacheDir) {
    option.cacheDir = cacheDir;
  }

  // 如果指定强制不生成 package-lock.json 文件，则使用: --no-package-lock / 或者代码调用中传 package-lock: false
  if (option['package-lock'] === undefined && !option['no-package-lock']) {
    option['dependencies-tree'] = path.join(cwd, 'package-lock.json');
    option['save-dependencies-tree'] = true;
  }

  const cacheInstaller = cache.get('installer');
  if (cacheInstaller && cacheInstaller === 'npm') {
    installer = 'npm';
    paths = ['i'].concat(paths);
    delete option.registry;
    delete option.china;
    const cnpmrc = path.join(os.homedir(), '.cnpmrc');
    // 指定npm的配置文件是cnpmrc
    if (fs.existsSync(cnpmrc)) {
      option.userconfig = cnpmrc;
    }
  }

  log.debug('installer = %s', installer);

  // 将pkg进行扁平化
  if (!Array.isArray(paths) && paths) {
    paths = paths.split(' ') || [];
  }

  const args = paths.concat(
    dargs(option, {
      aliases: {
        S: '-save',
        D: '-save-dev',
        O: '-save-optional',
        E: '-save-exact'
      }
    })
  );

  log.debug('args = %o', args);
  log.debug('options = %o', option);
  return new Promise((resolve, reject) => {
    spawn(installer, args, option)
      .on('error', (e) => {
        reject(e);
      })
      .on('exit', (err) => {
        if (err) {
          reject(
            new Error(
              `安装 ${paths} 失败！为了保证项目稳定性，请删除本地失败的node_modules后再重试。可执行命令: rm -rf node_modules`
            )
          );
        } else {
          resolve(true);
        }
      });
  });
}

/**
 * 是否存在模块
 * @param name
 */
export async function has(name: string, options?: NpmOption) {
  const registry = getRegistry(name);
  options = {
    registry,
    ...options
  };
  const url = `${options.registry}${encodeURIComponent(name)}/latest`;
  log.debug('check module has =%s', url);
  try {
    const res: any = await axios.head(url, { timeout: TIMEOUT });
    return !/4\d\d/.test(res.status);
  } catch (e) {
    const errMsg = `get ${url} has error: ${e.toString()}`;
    log.debug(errMsg);
    return false;
  }
}

export interface ChangeLog {
  version: string;
}

export interface ModuleInfo {
  name: string;
  chName: string;
  description: string;
}

export interface PackageData {
  version: string;
  name: string;
  author: string;
  description: string;
  changeLog: ChangeLog[];
  modules?: string[];
  tiny?: string[];
}

/**
 * 获取最新私有npm的包信息
 */
export async function latest(name: string, options?: NpmOption): Promise<PackageData | null> {
  const registry = getRegistry(name);
  options = {
    registry,
    version: 'latest',
    ...options
  };
  const url = `${options.registry}${encodeURIComponent(name)}/${options.version}`;
  let data = null;
  try {
    log.debug(`get ${name} url = %s`, url);
    // 5秒到期
    const res: any = await axios.get(url, { timeout: TIMEOUT });
    data = res.data;
    if (!data) {
      data = null;
    }
  } catch (e) {
    const errMsg = `get ${url} has error: ${e.toString()}`;
    // 不建议输出error，可能会涉及 xxx-toolkit -> tiny-toolkit 的查找场景.
    log.debug(errMsg);
    // 返回数据出错
    data = null;
  }
  return data;
}

export default {
  install,
  installDependencies,
  latest,
  has,
  getCnpmrc,
  setCnpmrc,
  runInstall
};
