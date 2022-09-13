const TOOLKIT_COMMAND_HOOK = '$task';

/**
 * 判断当前对象是否为 generator 对象
 * @param obj
 * @returns {boolean}
 */
export function isGenerator(obj: any) {
	return typeof obj.next === 'function' && typeof obj.throw === 'function';
}

/**
 * 判断当前对象是否为 generator 函数
 * @param obj
 * @returns {boolean}
 */
export function isGeneratorFunction(obj: any) {
	const constructor = obj.constructor;
	if (!constructor) {
		return false;
	}
	if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') {
		return true;
	}
	return isGenerator(constructor.prototype);
}
export function classify(tasks: any[]) {
	let match = false;
	const before: any[] = [];
	const after: any[] = [];

	tasks.forEach((item) => {
		if (item.command && item.command === TOOLKIT_COMMAND_HOOK) {
			match = true;
		} else if (match) {
			after.push(item);
		} else {
			before.push(item);
		}
	});
	const data: any = {
		before,
		after,
	};
	return data;
}

export default {
	isGenerator,
	isGeneratorFunction,
	classify,
};
