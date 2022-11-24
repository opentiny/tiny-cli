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
import { getScope } from '../cli-config/index';

const handleList: any = [];

export default {
	/**
	 * 处理模块名,返回正确的名称
	 * abc/abc.js
	 * @cloud/abc/a.js
	 * @cloud/abc
	 * abc
	 */
	pureModuleName(moduleName) {
		const modules = moduleName.split('/');
		const scope = getScope();
		let module = moduleName;

		// @cloud/xxx,@cloud/xxx的情况
		if (modules.length > 1) {
			if (modules[0].indexOf(`@${scope}`) !== -1) {
				module = `${modules[0]}/${modules[1]}`;
			} else {
				module = modules[0];
			}
		}
		return module;
	},
	register(handle: any) {
		if (typeof handle === 'function') {
			handleList.push(handle);
		}
	},
	getHandleList() {
		return handleList;
	},
};
