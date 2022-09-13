import { isGenerator, isGeneratorFunction } from './utils';
import report, { ErrorType } from '../report/index';
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
			report.error(ErrorType.CLI_CORE, e.stack || e);
			throw e;
		}
		next();
		return res;
	}

	let res: any;
	try {
		res = method.apply(null, args.concat(next));
	} catch (e) {
		report.error(ErrorType.CLI_CORE, e.stack || e);
		throw e;
	}
	// return 为 promise 对象的情况
	if (res && typeof res.then === 'function') {
		let res2: any;
		try {
			res2 = await res;
		} catch (e) {
			report.error(ErrorType.CLI_CORE, e.stack || e);
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
