/**
 * @desc 根据用户当前 git 信息去获取用户相关信息
 */
import { UserInfo } from './interface';
/**
 * 获取当前电脑用户
 */
export declare function get(): UserInfo;
/**
 * 写入user缓存
 * @param data 需要写入用户信息字段的数据
 */
export declare function set(data: any): void;
declare const _default: {
    get: typeof get;
    set: typeof set;
};
export default _default;
