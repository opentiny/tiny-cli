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
