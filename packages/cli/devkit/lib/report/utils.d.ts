/**
 * 环境变量获取
 */
export declare const cacheEnvGetter: {
    nodeVersion(): string;
    user(): import("../user/interface").UserInfo;
    cliName(): string;
    npmVersion(): string | null;
    system(): string;
};
/**
 * 获取项目的环境信息
 * @param force 为true时 则获取实时信息，否则读取缓存
 * 对 npm, node 版本等重新获取,一般在报错的时候才传入 true
 * @returns {*}
 */
export declare function getProjectEnv(force?: boolean): any;
/**
 * 获取项目相关环境
 * @param cwd 项目路径
 * @returns {object} 返回项目相关的信息
            branch 当前项目分支
        pkg 当前package.json 内容
        configFile 当前 aio.config.js 内容
        repository 项目仓库url
 */
export declare function getProjectInfo(cwd: string): any;
/**
 * 获取当前执行的命令,移除用户路径
 */
export declare function getCommand(): string;
/**
 * 获取模块的类型和版本
 * @param mod 模块名称
 */
export declare function getModuleVersion(mod: string): any;
