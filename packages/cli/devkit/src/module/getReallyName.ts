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
import logs from '../log/index';
import localExist from './local-exist';
import onlineExist from './online-exist';
import { DEFAULT_BIN, DEFAULT_SCOPE, getScope } from '../cli-config/index';
import utils from './utils';

const log = logs('core-module');

/**
 * 返回的模块信息
 */
export interface ModuleInfo {
	exist: boolean; // 模块是否存在
	isUseModule: boolean; // 是否使用tiny原生模块
	reallyName: string; // 实际运行的模块名称
}

/**
 * 获取实际可执行的套件或插件名称
 * 获取逻辑: 自定义本地套件/插件 -> cli本地套件/插件 -> 自定义线上套件/插件 -> cli线上套件/插件
 * @param name 套件或插件名，传入的是完整，必须带上 toolkit 或 plugin
 */
export default async function (name: string): Promise<ModuleInfo> {
	// TODO 校验name的格式

	const prefix = utils.prefix();
	const scope = getScope();
	// 如果是自定义prefix的插件
	const isCustomPrefix = prefix !== DEFAULT_BIN;
	// 是否使用的是tiny插件
	let isUseModule = false;

	// tiny模块名称 @opentiny/{yy}-plugin-xxx
	const tinyName = name.replace(scope, DEFAULT_SCOPE).replace(prefix, DEFAULT_BIN);

	// 实际调用的插件名
	let reallyName = name;
	// 执行插件的方法
	let exist = localExist(name);
	log.debug(`本地 ${name} 模块: ${exist}`);
	if (!exist) {
		// 判断一下是不是自定义prefix的情况
		// 是的话走下面的逻辑
		if (isCustomPrefix) {
			exist = localExist(tinyName);
			log.debug(`本地tiny ${tinyName} 模块: ${exist}`);
			if (!exist) {
				// 查找线上版本
				exist = await onlineExist(name);
				log.debug(`线上 ${name} 模块: ${exist}`);
				if (!exist) {
					exist = await onlineExist(tinyName);
					log.debug(`线上tiny ${tinyName} 模块: ${exist}`);
					if (exist) {
						// 如果存在，则返回真实获取的名称
						reallyName = tinyName;
						isUseModule = true;
					}
				}
			} else {
				reallyName = tinyName;
				isUseModule = true;
			}
		} else {
			exist = await onlineExist(name);
			log.debug(`线上 ${name} 模块: ${exist}`);
		}
	}

	const moduleInfo: ModuleInfo = {
		exist, // 模块是否存在
		isUseModule, // 是否使用tiny原生模块
		reallyName, // 实际运行的模块名称
	};

	log.debug('当前实际的模块信息 %o', moduleInfo);

	return moduleInfo;
}
