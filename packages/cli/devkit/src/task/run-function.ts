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
import { isGenerator, isGeneratorFunction } from './utils';
/**
 * 执行某个函数
 *  如果是 generator 类型,则使用 yield执行, 并在其后执行 next(0\)
 *  否则普通调用, 并传入 next 函数
 * @param options {object}
 * @param options.method {function} 函数体
 * @param options.args {array} 参数
 * @param options.next {function} 下一步执行方法
 * @return {mix} 函数体内的返回值
 */
async function runFunction(options: any) {
	const noop = () => {};
	const method = options.method;
	const args = options.args || [];
	const next = options.next || noop;
	if (isGeneratorFunction(method) || isGenerator(method)) {
		let res: any;
		try {
			res = await method.apply(null, args);
		} catch (e) {
			throw e;
		}
		next();
		return res;
	}

	let res: any;
	try {
		res = method.apply(null, args.concat(next));
	} catch (e) {
		throw e;
	}
	// return 为 promise 对象的情况
	if (res && typeof res.then === 'function') {
		let res2: any;
		try {
			res2 = await res;
		} catch (e) {
			throw e;
		}
		next();
		return res2;
	} else {
		next();
	}
	return res;
}

export default runFunction;
