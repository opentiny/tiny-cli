/**
* 获取配置文件的名称
* @return {string}
*/
export declare function getConfigName(): string;
/**
 * 获取config.js的文件路径
 */
export declare function getConfigPath(): string;
/**
* 当前目录下是否存在aio.config.js文件
* @param {string} dir 需要判断文件是否存在的目录,可选,默认取值:当前运行目录
*/
export declare function exist(dir?: string): boolean;
/**
* 获取整个pi.config.js文件的内容
*/
export declare function getAll(dir: string): any;
/**
* 根据key获取aio.config.js的单个对象
* @param key 配置的键名
* @param dir 配置文件的路径
* @return object
*/
export declare function get(key: string, dir?: string): any;
/**
   * 获取套件的名字
   */
export declare function getToolkitName(dir?: string): string | null;
/**
   * 设置aio.config.js的属性值,写入相关内容
   * @param key aio.config.js中的key
   * @param value key对应的value
   * @param dir 配置文件路径
   */
export declare function set(key: string, value: any, dir?: string): void;
declare const _default: {
    exist: typeof exist;
    set: typeof set;
    get: typeof get;
    getAll: typeof getAll;
    getConfigName: typeof getConfigName;
    getConfigPath: typeof getConfigPath;
    getToolkitName: typeof getToolkitName;
};
export default _default;
