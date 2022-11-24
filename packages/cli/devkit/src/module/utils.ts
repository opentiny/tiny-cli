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
import Intl from '../intl/index';
import logs from '../log/index';
import chalk from 'chalk';
import fs from 'fs-extra';
import emoji from 'node-emoji';
import * as path from 'path';
import semver from 'semver';
import message from './locale';
import { PROCESS_ENV_BIN, DEFAULT_BIN, getBinName, getScope } from '../cli-config/index';

const log = logs('core-module');

/**
 * 版本更新日志打印
 * @param name
 * @param opt
 * @param opt.localPkg
 * @param opt.lastPkg
 * @param opt.level
 */
function updateLog(name: string, opt?: any) {
	const ulog = log[opt.level || 'success'];
	const intl = new Intl(message);
	let pre = '';
	let localVersion = '';
	const lastVersion = opt.lastPkg.version;

	if (opt.localPkg && opt.localPkg.version !== lastVersion) {
		localVersion = opt.localPkg.version;
		pre = intl.get('updateTo', { localVersion, lastVersion });
	} else {
		pre = intl.get('updateVersion', { lastVersion });
		localVersion = lastVersion;
	}

	if (opt.lastPkg.changeLog) {
		const changeLog: any = opt.lastPkg.changeLog.sort((a: any, b: any) =>
			semver.lt(a.version, b.version) ? 1 : -1
		);

		// 在警告模式下加重提示样式
		if (opt.level === 'warn') {
			const tool = getBinName();
			const localVTip = localVersion ? intl.get('localVersion', { localVersion }) : '';
			const installTip = `${tool} install ${opt.lastPkg.name}`;

			console.log('\n');
			ulog(
				`******************** ${emoji.get('warning')} ${emoji.get('warning')}   ${intl.get(
					'updateTips'
				)}  ${emoji.get('warning')} ${emoji.get('warning')} **********************`
			);
			ulog(
				`${intl.get('recommendVersion', {
					name,
					version: chalk.green(lastVersion),
				})}${localVTip}`
			);
			ulog(
				intl.get('recommendInstall', {
					icon: emoji.get('point_right'),
					installTip: chalk.bgRed.bold(installTip),
				})
			);
		}

		ulog(`${name} ${pre}, ${intl.get('includeUpdate')}`);
		changeLog.forEach((item: any) => {
			if (!item.log || !item.log.length) {
				return;
			}
			if (lastVersion === localVersion) {
				if (item.version !== lastVersion) {
					return;
				}
			} else if (!semver.lte(item.version, lastVersion) || !semver.gt(item.version, localVersion)) {
				return;
			}

			// 显示未更新的这几个版本log
			item.log.forEach((itemLog: any) => {
				ulog(` --${itemLog}`);
			});
		});

		// 在警告模式下加重提示样式
		if (opt.level === 'warn') {
			ulog(
				`******************************${emoji.get('point_up_2')} ${emoji.get(
					'point_up_2'
				)} ******************************`
			);
			console.log('\n');
		}
	}
}

/**
 * 解决npminstall不存在package.json时依赖无法正常安装的问题
 * @param cwd 安装路径
 * @param name 模块名称
 * @param version 版本号
 */
function addModuleToDependencies(cwd: string, name: string, version: string) {
	version = version || 'latest';
	let pkgFile: any = { dependencies: {} };
	const pkgPath = path.join(cwd, 'package.json');
	if (fs.existsSync(pkgPath)) {
		pkgFile = fs.readJsonSync(pkgPath);
	}
	pkgFile.dependencies[name] = version;
	fs.outputJsonSync(pkgPath, pkgFile);
}

function removeModuleToDependencies(cwd: string, name: string) {
	let pkgFile: any;
	const pkgPath = path.join(cwd, 'package.json');
	if (!fs.existsSync(pkgPath)) {
		return;
	}
	pkgFile = fs.readJsonSync(pkgPath);
	delete pkgFile.dependencies[name];
	fs.outputJsonSync(pkgPath, pkgFile);
}

/**
 * 获取模块的前缀
 * @returns {string|string}
 */
function prefix(): string {
	return process.env[PROCESS_ENV_BIN] || DEFAULT_BIN;
}

/**
 * 获取套件模块完整名字
 * @param name 可传入的参数可能是：xxx,toolkit-xxx,@opentiny/tiny-toolkit-xxx
 * @returns {string}
 */
function toolkitFullName(name: string): string {
	let full = '';
	const prefix = utils.prefix();
	const tPrefix = utils.toolkitPrefix();
	const scope = getScope();
	name = name.replace(`@${scope}/`, '');
	// 当第三方cli使用时，传入的参数如 tiny-toolkit-dev ，那么能正确获取到
	if (name.indexOf(tPrefix) === 0 || name.indexOf('toolkit') > 0) {
		full = name;
	} else if (name.indexOf('toolkit') === 0) {
		full = `${prefix}-${name}`;
	} else {
		full = `${tPrefix}${name}`;
	}
	return `@${scope}/${full}`;
}

/**
 * 获取插件模块完整名字
 * 传入的可能是 @opentiny/cli-plugin-xxx plugin-xxx
 * @returns {string}
 */
function pluginFullName(name: string): string {
	let full = '';
	const prefix = utils.prefix();
	const pPrefix = utils.pluginPrefix();
	const scope = getScope();
	name = name.replace(`@${scope}/`, '');
	// tiny-plugin-xxx 的情况，和 name不是prefix开头的情况
	if (name.indexOf(pPrefix) === 0 || name.indexOf('plugin') > 0) {
		full = name;
	} else if (name.indexOf('plugin') === 0) {
		// plugin-xxx 的情况
		full = `${prefix}-${name}`;
	} else {
		full = `${pPrefix}${name}`;
	}
	return `@${scope}/${full}`;
}

/**
 * 根据传入的插件名称缩写,获取模块名称
 * @param name
 * @returns {*}
 */
function fullName(name: string): string {
	if (name.indexOf('plugin-') > -1) {
		return pluginFullName(name);
	} else if (name.indexOf('toolkit-') > -1) {
		return toolkitFullName(name);
	}
	return name;
}

/**
 * 获取套件的前缀
 */
function toolkitPrefix() {
	const pre = prefix();
	return `${pre}-toolkit-`;
}

/**
 * 获取插件的前缀
 */
function pluginPrefix() {
	const pre = prefix();
	return `${pre}-plugin-`;
}

const utils = {
	moduleFilter(list: any, type: string) {
		return list.filter((item: any) => item.name.indexOf(`${type}-`) > -1);
	},
	toolkitPrefix,
	pluginPrefix,
	toolkitFullName,
	pluginFullName,
	fullName,
	prefix,
	UPDATE_CHECK_PRE: 'moduleCheck_',
	ONLINE_MODULE_CACHE_KEY_IN: 'onlineModuleListIn',
	ONLINE_MODULE_CACHE_KEY_OUT: 'onlineModuleListOut',
	updateLog,
	addModuleToDependencies,
	removeModuleToDependencies,
	NO_TIP_PERIOD: 3600000,
};

export default utils;
