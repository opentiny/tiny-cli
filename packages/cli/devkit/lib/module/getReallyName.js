"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../log/index"));
const local_exist_1 = __importDefault(require("./local-exist"));
const online_exist_1 = __importDefault(require("./online-exist"));
const index_2 = require("../cli-config/index");
const utils_1 = __importDefault(require("./utils"));
const log = index_1.default('core-module');
/**
 * 获取实际可执行的套件或插件名称
 * 获取逻辑: 自定义本地套件/插件 -> cli本地套件/插件 -> 自定义线上套件/插件 -> cli线上套件/插件
 * @param name 套件或插件名，传入的是完整，必须带上 toolkit 或 plugin
 */
async function default_1(name) {
    // TODO 校验name的格式
    const prefix = utils_1.default.prefix();
    const scope = index_2.getScope();
    // 如果是自定义prefix的插件
    const isCustomPrefix = prefix !== index_2.DEFAULT_BIN;
    // 是否使用的是aio插件
    let isUseModule = false;
    // aio模块名称 @cloud/{yy}-plugin-xxx
    const aioName = name.replace(scope, index_2.DEFAULT_SCOPE).replace(prefix, index_2.DEFAULT_BIN);
    // 实际调用的插件名
    let reallyName = name;
    // 执行插件的方法
    let exist = local_exist_1.default(name);
    log.debug(`本地 ${name} 模块: ${exist}`);
    if (!exist) {
        // 判断一下是不是自定义prefix的情况
        // 是的话走下面的逻辑
        if (isCustomPrefix) {
            exist = local_exist_1.default(aioName);
            log.debug(`本地aio ${aioName} 模块: ${exist}`);
            if (!exist) {
                // 查找线上版本
                exist = await online_exist_1.default(name);
                log.debug(`线上 ${name} 模块: ${exist}`);
                if (!exist) {
                    exist = await online_exist_1.default(aioName);
                    log.debug(`线上aio ${aioName} 模块: ${exist}`);
                    if (exist) {
                        // 如果存在，则返回真实获取的名称
                        reallyName = aioName;
                        isUseModule = true;
                    }
                }
            }
            else {
                reallyName = aioName;
                isUseModule = true;
            }
        }
        else {
            exist = await online_exist_1.default(name);
            log.debug(`线上 ${name} 模块: ${exist}`);
        }
    }
    const moduleInfo = {
        exist,
        isUseModule,
        reallyName,
    };
    log.debug('当前实际的模块信息 %o', moduleInfo);
    return moduleInfo;
}
exports.default = default_1;
