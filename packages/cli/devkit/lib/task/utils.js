"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classify = exports.isGeneratorFunction = exports.isGenerator = void 0;
const TOOLKIT_COMMAND_HOOK = '$task';
/**
 * 判断当前对象是否为 generator 对象
 * @param obj
 * @returns {boolean}
 */
function isGenerator(obj) {
    return typeof obj.next === 'function' && typeof obj.throw === 'function';
}
exports.isGenerator = isGenerator;
/**
 * 判断当前对象是否为 generator 函数
 * @param obj
 * @returns {boolean}
 */
function isGeneratorFunction(obj) {
    const constructor = obj.constructor;
    if (!constructor) {
        return false;
    }
    if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') {
        return true;
    }
    return isGenerator(constructor.prototype);
}
exports.isGeneratorFunction = isGeneratorFunction;
function classify(tasks) {
    let match = false;
    const before = [];
    const after = [];
    tasks.forEach((item) => {
        if (item.command && item.command === TOOLKIT_COMMAND_HOOK) {
            match = true;
        }
        else if (match) {
            after.push(item);
        }
        else {
            before.push(item);
        }
    });
    const data = {
        before,
        after,
    };
    return data;
}
exports.classify = classify;
exports.default = {
    isGenerator,
    isGeneratorFunction,
    classify,
};
