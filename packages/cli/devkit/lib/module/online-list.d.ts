import { ModuleInfo } from '../npm/index';
/**
 * 获取列表, 缓存机制\
 * @returns {*|Request|Array}
 */
declare function onlineList(options: any): Promise<ModuleInfo[]>;
export default onlineList;
