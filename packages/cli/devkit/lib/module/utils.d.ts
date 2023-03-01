/**
 * 版本更新日志打印
 * @param name
 * @param opt
 * @param opt.localPkg
 * @param opt.lastPkg
 * @param opt.level
 */
declare function updateLog(name: string, opt?: any): void;
/**
 * 解决npminstall不存在package.json时依赖无法正常安装的问题
 * @param cwd 安装路径
 * @param name 模块名称
 * @param version 版本号
 */
declare function addModuleToDependencies(cwd: string, name: string, version: string): void;
declare function removeModuleToDependencies(cwd: string, name: string): void;
/**
 * 获取模块的前缀
 * @returns {string|string}
 */
declare function prefix(): string;
/**
 * 获取套件模块完整名字
 * @param name 可传入的参数可能是：xxx,toolkit-xxx,@opentiny/cli-toolkit-xxx
 * @returns {string}
 */
declare function toolkitFullName(name: string): string;
/**
 * 获取插件模块完整名字
 * 传入的可能是 @opentiny/cli-plugin-xxx plugin-xxx
 * @returns {string}
 */
declare function pluginFullName(name: string): string;
/**
 * 根据传入的插件名称缩写,获取模块名称
 * @param name
 * @returns {*}
 */
declare function fullName(name: string): string;
/**
 * 获取套件的前缀
 */
declare function toolkitPrefix(): string;
/**
 * 获取插件的前缀
 */
declare function pluginPrefix(): string;
declare const utils: {
    moduleFilter(list: any, type: string): any;
    toolkitPrefix: typeof toolkitPrefix;
    pluginPrefix: typeof pluginPrefix;
    toolkitFullName: typeof toolkitFullName;
    pluginFullName: typeof pluginFullName;
    fullName: typeof fullName;
    prefix: typeof prefix;
    UPDATE_CHECK_PRE: string;
    ONLINE_MODULE_CACHE_KEY_IN: string;
    ONLINE_MODULE_CACHE_KEY_OUT: string;
    updateLog: typeof updateLog;
    addModuleToDependencies: typeof addModuleToDependencies;
    removeModuleToDependencies: typeof removeModuleToDependencies;
    NO_TIP_PERIOD: number;
};
export default utils;
