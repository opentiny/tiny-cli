/**
 * 升级提示，若发布新版本，会定时提醒是否需要更新
 * @param data object { "name" : 包名, "version" : 当前版本}
 */
declare function updateTip(data: any): Promise<boolean>;
export default updateTip;
