/**
 * 判断当前对象是否为 generator 对象
 * @param obj
 * @returns {boolean}
 */
export declare function isGenerator(obj: any): boolean;
/**
 * 判断当前对象是否为 generator 函数
 * @param obj
 * @returns {boolean}
 */
export declare function isGeneratorFunction(obj: any): boolean;
export declare function classify(tasks: any[]): any;
declare const _default: {
    isGenerator: typeof isGenerator;
    isGeneratorFunction: typeof isGeneratorFunction;
    classify: typeof classify;
};
export default _default;
