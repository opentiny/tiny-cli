/**
 * @desc: 缓存模块
 * @author: 华宇果
 */
/**
 * 获取缓存内容,如果不存在或已过期则返回 null
 * @param {string} key 缓存的键
 * @returns {mix}
 */
export declare function get(key: string): any;
export interface CacheOption {
    expires?: number | null;
}
/**
 * 设置缓存内容
 * @param key {string} 缓存的键
 * @param value {mix} 缓存的值
 * @param options {object}
 * @param options.expires {number} 有效时长,毫秒为单位, 如 1分钟为 360000
 * @returns {boolean}
 */
export declare function set(key: string, value: any, options?: CacheOption): void;
/**
 * 获取缓存文件
 */
export declare function getCacheFile(): string;
/**
 * 清除所有的缓存
 */
export declare function clear(): void;
declare const _default: {
    get: typeof get;
    set: typeof set;
    getCacheFile: typeof getCacheFile;
    clear: typeof clear;
};
export default _default;
