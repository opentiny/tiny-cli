/**
 * @desc: 本地模块列表
 */

import home from '../home/index';
import logs from '../log/index';
import fs from 'fs-extra';
import * as path from 'path';
import utils from './utils';

const log = logs('core-module');

/**
 * 列出所有本地模块
 * @param options object {type (按类型筛选): 'toolkit | plugin'}
 * @returns {Array}
 */
function localList(options?: any) {
	options = options || {};
	const modulesPath = home.getModulesPath();
	let modulePkgs: any[] = [];

	const homePath = home.getHomePath();
	const homePkgPath = path.resolve(homePath, 'package.json');
	if (fs.existsSync(homePkgPath)) {
		const homePkg = fs.readJsonSync(homePkgPath);
		if (homePkg.dependencies) {
			Object.keys(homePkg.dependencies).forEach((item) => {
				const pkgPath = path.resolve(modulesPath, item, 'package.json');
				if (fs.existsSync(pkgPath)) {
					const modPkg = fs.readJsonSync(pkgPath);
					modulePkgs.push({
						name: modPkg.name,
						description: modPkg.description,
						chName:
							modPkg.aioOption && modPkg.aioOption.chName ? modPkg.aioOption.chName : modPkg.description,
					});
				}
			});
		}
	}

	modulePkgs = options.type ? utils.moduleFilter(modulePkgs, options.type) : modulePkgs;

	log.debug('所有本地模块: %o', modulePkgs);

	return modulePkgs;
}

export default localList;
