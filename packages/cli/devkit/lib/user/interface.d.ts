export interface UserInfo {
    name: string;
    email: string;
    id?: number;
    username?: string;
    state?: string;
    avatar_url?: string;
    [propName: string]: any;
}
