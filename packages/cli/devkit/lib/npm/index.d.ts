/**
 * npm install时可传的选项
 * 透传：https://www.npmjs.com/package/npminstall
 */
export interface NpmOption {
    registry?: string;
    china?: boolean;
    stdio?: string;
    cwd?: string;
    root?: string;
    targetDir?: string;
    binDir?: string;
    debug?: boolean;
    storeDir?: string;
    ignoreScripts?: boolean;
    forbiddenLicenses?: string;
    proxy?: string;
    production?: boolean;
    env?: string;
    detail?: string;
    version?: string;
    save?: boolean;
    'save-dev'?: boolean;
    'save-optional'?: boolean;
    'save-exact'?: boolean;
    S?: boolean;
    D?: boolean;
    O?: boolean;
    E?: boolean;
    [key: string]: string | boolean | undefined;
}
/**
 * 获取cnpmrc配置文件
 */
export declare function getCnpmrc(): any;
/**
 * 将对象写入进npmrc文件
 * @param config npmrc配置文件的内容
 */
export declare function setCnpmrc(config: any): void;
/**
     * 安装 npm 包
     * @param pkg {string|array} 需要安装的包或包列表, 需要带版本号直接在包名后面 @ 版本号即可
            // pkgs: [
            //   { name: 'foo', version: '~1.0.0' },
            // ],
     * @param options
     */
export declare function install(pkg: string | string[], options?: NpmOption): Promise<void>;
/**
 * 移除npm包
 */
export declare function unInstall(pkg: string | string[], options?: NpmOption): Promise<void>;
/**
 * 安装package.json 中的依赖
 */
export declare function installDependencies(options?: NpmOption): Promise<void>;
/**
 * 安装 npm 包
 * @param installer {string} 安装工具路径
 * @param paths {string|array} 需要安装的包或包列表,需要带版本号直接在包名后面 @ 版本号即可, 留空安装当前目录下的 package.json 依赖
 * @param options
 */
export declare function runInstall(installer: string, paths: any, options?: NpmOption): Promise<unknown>;
/**
 * 是否存在模块
 * @param name
 */
export declare function has(name: string, options?: NpmOption): Promise<boolean>;
export interface ChangeLog {
    version: string;
}
export interface ModuleInfo {
    name: string;
    chName: string;
    description: string;
}
export interface PackageData {
    version: string;
    name: string;
    author: string;
    description: string;
    changeLog: ChangeLog[];
    modules?: string[];
    aio?: string[];
    cui?: string[];
}
/**
 * 获取最新私有npm的包信息
 */
export declare function latest(name: string, options?: NpmOption): Promise<PackageData | null>;
declare const _default: {
    install: typeof install;
    installDependencies: typeof installDependencies;
    latest: typeof latest;
    has: typeof has;
    getCnpmrc: typeof getCnpmrc;
    setCnpmrc: typeof setCnpmrc;
    runInstall: typeof runInstall;
};
export default _default;
