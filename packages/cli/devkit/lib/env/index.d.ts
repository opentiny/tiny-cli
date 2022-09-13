export declare enum EnvType {
    Green = "Green",
    Yellow = "Yellow",
    Red = "Red",
    None = "None"
}
/**
 * 往配置文件(aio.env.json)写入用户自定义的环境配置
 * @param env
 */
export declare function set(env: EnvType): void;
/**
 * 获取当前用户的环境变量
 * 优先判断process.env.AIO_ENV变量
 * @returns {EnvType} 返回可枚举的环境类型
 */
export declare function get(): EnvType;
/**
 * 判断cli环境配置文件(aio.env.json)是否存在
 * 可用做cli环境是否已初始化的判断
 * @returns {boolean}
 */
export declare function has(): boolean;
/**
 * 删除cli环境配置文件(aio.env.json)
 */
export declare function remove(): void;
declare const _default: {
    set: typeof set;
    get: typeof get;
    has: typeof has;
    remove: typeof remove;
};
export default _default;
