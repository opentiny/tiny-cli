/**
 * 获取 cli 插件或套件包逻辑
 * @param name 完整的模块名，如 @opentiny/cli-toolkit-xxx
 * @returns {*}
 */
declare function get(name: string): Promise<any>;
export default get;
