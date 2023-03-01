export interface UserInfo {
    name: string;
    email: string;
}
/**
 * 从配置文件中获取用户信息
 */
export declare function getUserFromFile(): UserInfo;
/**
 * 从git的配置文件中获取用户信息
 */
export declare function getUserFromGit(): UserInfo;
