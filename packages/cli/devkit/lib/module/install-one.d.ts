/**
 *
 * @param name 模块名称，可能的格式{modulename}@{version} or {modulename}
 * @param options
 */
declare function installOne(name: string, options?: any): Promise<void>;
export default installOne;
