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
import cache from '../cache/index';
import home from '../home/index';
import Intl from '../intl/index';
import logs from '../log/index';
import npm from '../npm/index';
import fs from 'fs-extra';
import * as path from 'path';
import semver from 'semver';
import installOne from './install-one';
import utils from './utils';
import message from './locale/index';
import getEsModule from './getEsModule';
import error from '../error/index';

const log = logs('core-module');

/**
 *  設置緩存
 * @param name 模塊名稱
 */
function setCache(name: string) {
	cache.set(`${utils.UPDATE_CHECK_PRE}${name}`, true, {
		expires: utils.NO_TIP_PERIOD,
	});
}

/**
 * 获取 cli 插件或套件包逻辑
 * @param name 完整的模块名，如 @opentiny/cli-toolkit-xxx
 * @returns {*}
 */
async function get(name: string) {
	let returnPkg = false;
	const intl = new Intl(message);
	if (/\/package\.json$/.test(name)) {
		name = name.replace('/package.json', '');
		returnPkg = true;
	}

	const modulePath = path.resolve(home.getModulesPath(), name);
	const pkgPath = path.resolve(modulePath, 'package.json');

	if (fs.existsSync(pkgPath)) {
		log.debug(`存在本地模块 ${pkgPath}`);
		const cacheKey = `${utils.UPDATE_CHECK_PRE}${name}`;
		const needUpdate = !cache.get(cacheKey);
		log.debug(`key: ${cacheKey} , 判断是否需要更新 ${needUpdate}`);

		// 本地存在, 判断是否需要更新
		if (needUpdate) {
			// 获取最新版本
			const lastPkg = await npm.latest(name);
			const localPkg = fs.readJsonSync(pkgPath);
			// 如果有执行了安装或更新的,这里就无须再设置缓存提示了,因为执行安装或更新后已经设置了一遍
			let isNeedSetCache = true;
			// 有可能网络错误,这里进行判断一下看是否需要再进行更新操作
			if (lastPkg) {
				if (semver.lt(localPkg.version, lastPkg.version, true)) {
					if (localPkg.tinyOption && localPkg.tinyOption.update) {
						// 自动更新
						log.info(intl.get('autoUpdate', { name }));
						await installOne(name, {
							type: 'update',
							localPkg,
							lastPkg,
						});
						isNeedSetCache = false;
					} else {
						// 末位版本自动更新操作
						let autoZVersion = '';
						if (lastPkg.changeLog) {
							// 在 changeLog 里面检测是否有末位更新的版本
							lastPkg.changeLog = lastPkg.changeLog.sort((a: any, b: any) =>
								semver.lt(a.version, b.version) ? 1 : -1
							);
							for (let j = 0; j < lastPkg.changeLog.length; j += 1) {
								if (
									semver.satisfies(lastPkg.changeLog[j].version, `~${localPkg.version}`) &&
									lastPkg.changeLog[j].version !== localPkg.version
								) {
									autoZVersion = lastPkg.changeLog[j].version;
									break;
								}
							}
						}

						if (autoZVersion) {
							log.info(
								intl.get('autoUpdateZ', {
									localVersion: localPkg.version,
									autoZVersion,
								})
							);
							const comPkg = await npm.latest(name, {
								version: autoZVersion,
							});
							await installOne(name, {
								type: 'update',
								localPkg,
								lastPkg: comPkg,
							});
							isNeedSetCache = false;
						}

						if (!autoZVersion || semver.lt(autoZVersion, lastPkg.version)) {
							// 更新提示
							// 如果 autoZVersion 有值,那么去获取安装完后的 package.json 文件
							const newLocalPkg = autoZVersion ? fs.readJsonSync(pkgPath) : localPkg;
							utils.updateLog(name, {
								localPkg: newLocalPkg,
								lastPkg,
								level: 'warn',
							});
						}

						// 设置缓存, 1天内不再检查
						if (isNeedSetCache) {
							setCache(name);
						}
					}
				} else {
					setCache(name);
				}
			}
		}
	} else {
		log.info(intl.get('autoInstall', { name }));
		await installOne(name);
	}

	const pkg = fs.readJsonSync(pkgPath, { throws: false }) || {};
	let mod: any;
	try {
		mod = getEsModule(require(modulePath));
	} catch (e) {
		mod = {};
		error(e);
		// log.error(intl.get('getModuleErr', { modulePath }));
		// log.error(e);
		throw e;
	}

	// TODO 发送log记录，由于调用插件时，也会调用到套件，所以这里只有插件调用的时候才发送log
	// const pluginPrefix = utils.pluginPrefix();
	// if (!returnPkg && name.indexOf(pluginPrefix) !== -1) {
	// 	log.debug(`${name} 插件开始发送日志...`);
	// 	report.module(utils.fullName(name));
	// }

	return returnPkg ? pkg : mod;
}

export default get;
