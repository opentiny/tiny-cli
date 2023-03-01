"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ping_1 = __importDefault(require("ping"));
const index_1 = __importDefault(require("../cache/index"));
const index_2 = __importDefault(require("../log/index"));
const utils_1 = __importDefault(require("./utils"));
const index_3 = __importDefault(require("../npm/index"));
const index_4 = require("../cli-config/index");
const log = index_2.default('core-module');
/**
 * 获取列表, 缓存机制\
 * @returns {*|Request|Array}
 */
async function onlineList(options) {
    options = Object.assign({ cache: true }, options);
    const cacheKey = utils_1.default.ONLINE_MODULE_CACHE_KEY_OUT;
    let moduleList = (options.cache && index_1.default.get(cacheKey)) || [];
    log.debug('get online list from cache %o', moduleList);
    try {
        if (!moduleList.length) {
            // 先ping一下，看是否有网络
            const pingApi = 'npm.inhuawei.com';
            const pingRes = await ping_1.default.promise.probe(pingApi);
            if (!pingRes || !pingRes.alive) {
                log.error(`Network connection error for ${pingApi}`);
                throw Error('Network connection error');
            }
            const scope = index_4.getScope();
            const prefix = index_4.getBinName();
            const pkg = await index_3.default.latest(`@${scope}/aio-module-list`);
            // 数据不存在则直接返回原始数据
            if (!pkg) {
                return moduleList;
            }
            let modules = pkg.aio || {};
            // 非aio的套件与aio的套件合并到一起。
            if (prefix !== index_4.DEFAULT_BIN && pkg[prefix]) {
                modules = Object.assign(Object.assign({}, pkg.aio), pkg[prefix]);
            }
            const list = Object.keys(modules);
            list.forEach(item => {
                moduleList.push({
                    name: item,
                    chName: modules[item],
                    description: modules[item],
                });
            });
            // 如果没有列表，就不缓存了
            if (!moduleList.length) {
                index_1.default.set(cacheKey, moduleList, {
                    expires: 3600000,
                });
            }
        }
    }
    catch (e) {
        log.error(e);
    }
    moduleList = options.type ? utils_1.default.moduleFilter(moduleList, options.type) : moduleList;
    log.debug('所有线上模块: %o', moduleList);
    return moduleList;
}
exports.default = onlineList;
