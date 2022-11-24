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
import ping from 'ping';
import cache from '../cache/index';
import logs from '../log/index';
import utils from './utils';
import npm, {ModuleInfo} from '../npm/index';
import {getScope, getBinName, DEFAULT_BIN} from '../cli-config/index';
const log = logs('core-module');

/**
 * 获取列表, 缓存机制\
 * @returns {*|Request|Array}
 */
async function onlineList(options: any): Promise<ModuleInfo[]> {
	options = {
		cache: true,
		...options,
	};

	const cacheKey = utils.ONLINE_MODULE_CACHE_KEY_OUT;
	let moduleList: ModuleInfo[] = ( options.cache && cache.get(cacheKey) ) || [];

	log.debug('get online list from cache %o', moduleList);
	try {
		if (!moduleList.length) {
			// 先ping一下，看是否有网络
			// TODO
			const pingApi = 'npm.inhuawei.com';
			const pingRes = await ping.promise.probe(pingApi);

			if (!pingRes || !pingRes.alive) {
				log.error(`Network connection error for ${pingApi}`)
				throw Error('Network connection error');
			}
			const scope = getScope();
			const prefix = getBinName();
			const pkg = await npm.latest(`@${scope}/cli-module-list`);
			// 数据不存在则直接返回原始数据
			if (!pkg) {
				return moduleList;
			}
			let modules = pkg.tiny || {};
			// 非tiny的套件与tiny的套件合并到一起。
			if(prefix !== DEFAULT_BIN && pkg[prefix]){
				modules = {...pkg.tiny, ...pkg[prefix]}
			}
			const list: any[] = Object.keys(modules);
			list.forEach(item => {
				moduleList.push({
					name: item,
					chName: modules![item],
					description: modules![item],
				});
			});
			// 如果没有列表，就不缓存了
			if (!moduleList.length) {
				cache.set(cacheKey, moduleList, {
					expires: 3600000,
				});
			}
		}
	} catch (e) {
		log.error(e);
	}

	moduleList = options.type ? utils.moduleFilter(moduleList, options.type) : moduleList;

	log.debug('所有线上模块: %o', moduleList);

	return moduleList;
}

export default onlineList;
