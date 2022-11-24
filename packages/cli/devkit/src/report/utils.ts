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
import * as os from 'os';
import * as cp from 'child_process';
import home from '../home/index';
import user from '../user/index';
import * as path from 'path';
import git from '../git/index';
import { getBinName, PROCESS_ENV_CONFIG_FILE, PROCESS_ENV_CLI_VERSION } from '../cli-config/index';
import fs from '../fs/index';
import cache from '../cache/index';
import yargs from 'yargs';

const argv = yargs.help(false).argv;

const execSync = cp.execSync;

/**
 * 环境变量获取
 */
export const cacheEnvGetter = {
	nodeVersion() {
		return execSync('node -v')
			.toString()
			.replace(/[\nv]|\r/g, '');
	},
	user() {
		return user.get();
	},
	cliName() {
		return getBinName();
	},
	npmVersion() {
		try {
			return execSync('npm -v').toString().replace('\n', '');
		} catch (e) {
			return null;
		}
	},
	system() {
		return `${os.platform()} ${os.release()}`;
	},
};

/**
 * 获取项目的环境信息
 * @param force 为true时 则获取实时信息，否则读取缓存
 * 对 npm, node 版本等重新获取,一般在报错的时候才传入 true
 * @returns {*}
 */
export function getProjectEnv(force?: boolean): any {
	let cacheEnv = cache.get('envCache');
	if (!cacheEnv || force) {
		cacheEnv = {};
		const cacheEnvKeys = Object.keys(cacheEnvGetter);
		cacheEnvKeys.forEach((item) => {
			cacheEnv[item] = cacheEnvGetter[item]();
		});
		// 缓存12小时
		cache.set('envCache', cacheEnv, { expires: 60 * 60 * 24 });
	}
	// 版本信息直接获取就行，不用缓存，因为可能更新会比较快
	cacheEnv['cliVersion'] = process.env[PROCESS_ENV_CLI_VERSION];
	return cacheEnv;
}

/**
 * 获取项目相关环境
 * @param cwd 项目路径
 * @returns {object} 返回项目相关的信息
			branch 当前项目分支
		pkg 当前package.json 内容
		configFile 当前 tiny.config.js 内容
		repository 项目仓库url
 */
export function getProjectInfo(cwd: string): any {
	const branch = git.branch(cwd);
	const configPath = path.join(cwd, PROCESS_ENV_CONFIG_FILE);
	const pkg = fs.readPackage(cwd);
	const repository = git.repository(cwd);
	let configFile: any;
	// 判断tiny.config.js是否存在
	if (fs.existsSync(configPath)) {
		delete require.cache[configPath];
		try {
			configFile = require(configPath);
		} catch (e) {
			configFile = null;
		}
	}

	return {
		branch,
		pkg,
		configFile,
		repository,
	};
}

/**
 * 获取当前执行的命令,移除用户路径
 */
export function getCommand(): string {
	const argvClone = { ...argv };
	const cmd = [getBinName()].concat(argv._);
	delete argvClone._;
	delete argvClone.$0;

	Object.keys(argvClone).forEach((item) => {
		cmd.push(`--${item}`);
		if (argvClone[item] !== true) {
			cmd.push(argvClone[item]);
		}
	});
	return cmd.join(' ');
}

/**
 * 获取模块的类型和版本
 * @param mod 模块名称
 */
export function getModuleVersion(mod: string) {
	const modPkgPath = path.join(home.getModulesPath(), mod, 'package.json');
	const pkg = fs.existsSync(modPkgPath) ? fs.readJsonSync(modPkgPath, { throws: false }) : { version: null };
	return pkg.version;
}
