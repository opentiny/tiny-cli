/**
 * 获取cli的home路径
 * AIO_HOME_FOLDER 作用：可以自定义aio的核心目录，方便开发第三方cli工具进行定制
 * AIO_HOME 作用：方便单元测试时更改目录结构
 * @returns {string} 返回路径字符串
 */
export declare function getHomePath(): string;
/**
 * 获取cli模块的安装路径
 * @returns {string} 返回路径字符串
 */
export declare function getModulesPath(): string;
/**
 * 初始化home目录,并将信息缓存至process.env中
 */
export declare function initHomeDir(): void;
export interface clearResult {
    success: boolean;
    removePath: string;
}
/**
 * 清理Home目录内容
 * 用户手工删除是没影响的，aio会验证并初始化
 * 返回删除成功与否
 */
export declare function cleanHomeDir(): clearResult;
export declare const EntryModuleEnv = "AIO_ENTRY_MODULE";
declare const _default: {
    getHomePath: typeof getHomePath;
    getModulesPath: typeof getModulesPath;
    initHomeDir: typeof initHomeDir;
    cleanHomeDir: typeof cleanHomeDir;
    EntryModuleEnv: string;
};
export default _default;
