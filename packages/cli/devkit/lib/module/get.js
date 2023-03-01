"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../cache/index"));
const index_2 = __importDefault(require("../home/index"));
const index_3 = __importDefault(require("../intl/index"));
const index_4 = __importDefault(require("../log/index"));
const index_5 = __importDefault(require("../npm/index"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const semver_1 = __importDefault(require("semver"));
const install_one_1 = __importDefault(require("./install-one"));
const utils_1 = __importDefault(require("./utils"));
const index_6 = __importDefault(require("./locale/index"));
const getEsModule_1 = __importDefault(require("./getEsModule"));
const index_7 = __importDefault(require("../error/index"));
const log = index_4.default('core-module');
/**
 *  設置緩存
 * @param name 模塊名稱
 */
function setCache(name) {
    index_1.default.set(`${utils_1.default.UPDATE_CHECK_PRE}${name}`, true, {
        expires: utils_1.default.NO_TIP_PERIOD,
    });
}
/**
 * 获取 cli 插件或套件包逻辑
 * @param name 完整的模块名，如 @opentiny/cli-toolkit-xxx
 * @returns {*}
 */
async function get(name) {
    let returnPkg = false;
    const intl = new index_3.default(index_6.default);
    if (/\/package\.json$/.test(name)) {
        name = name.replace('/package.json', '');
        returnPkg = true;
    }
    const modulePath = path.resolve(index_2.default.getModulesPath(), name);
    const pkgPath = path.resolve(modulePath, 'package.json');
    if (fs_extra_1.default.existsSync(pkgPath)) {
        log.debug(`存在本地模块 ${pkgPath}`);
        const cacheKey = `${utils_1.default.UPDATE_CHECK_PRE}${name}`;
        const needUpdate = !index_1.default.get(cacheKey);
        log.debug(`key: ${cacheKey} , 判断是否需要更新 ${needUpdate}`);
        // 本地存在, 判断是否需要更新
        if (needUpdate) {
            // 获取最新版本
            const lastPkg = await index_5.default.latest(name);
            const localPkg = fs_extra_1.default.readJsonSync(pkgPath);
            // 如果有执行了安装或更新的,这里就无须再设置缓存提示了,因为执行安装或更新后已经设置了一遍
            let isNeedSetCache = true;
            // 有可能网络错误,这里进行判断一下看是否需要再进行更新操作
            if (lastPkg) {
                if (semver_1.default.lt(localPkg.version, lastPkg.version, true)) {
                    if (localPkg.aioOption && localPkg.aioOption.update) {
                        // 自动更新
                        log.info(intl.get('autoUpdate', { name }));
                        await install_one_1.default(name, {
                            type: 'update',
                            localPkg,
                            lastPkg,
                        });
                        isNeedSetCache = false;
                    }
                    else {
                        // 末位版本自动更新操作
                        let autoZVersion = '';
                        if (lastPkg.changeLog) {
                            // 在 changeLog 里面检测是否有末位更新的版本
                            lastPkg.changeLog = lastPkg.changeLog.sort((a, b) => semver_1.default.lt(a.version, b.version) ? 1 : -1);
                            for (let j = 0; j < lastPkg.changeLog.length; j += 1) {
                                if (semver_1.default.satisfies(lastPkg.changeLog[j].version, `~${localPkg.version}`) &&
                                    lastPkg.changeLog[j].version !== localPkg.version) {
                                    autoZVersion = lastPkg.changeLog[j].version;
                                    break;
                                }
                            }
                        }
                        if (autoZVersion) {
                            log.info(intl.get('autoUpdateZ', {
                                localVersion: localPkg.version,
                                autoZVersion,
                            }));
                            const comPkg = await index_5.default.latest(name, {
                                version: autoZVersion,
                            });
                            await install_one_1.default(name, {
                                type: 'update',
                                localPkg,
                                lastPkg: comPkg,
                            });
                            isNeedSetCache = false;
                        }
                        if (!autoZVersion || semver_1.default.lt(autoZVersion, lastPkg.version)) {
                            // 更新提示
                            // 如果 autoZVersion 有值,那么去获取安装完后的 package.json 文件
                            const newLocalPkg = autoZVersion ? fs_extra_1.default.readJsonSync(pkgPath) : localPkg;
                            utils_1.default.updateLog(name, {
                                localPkg: newLocalPkg,
                                lastPkg,
                                level: 'warn',
                            });
                        }
                        // 设置缓存, 1天内不再检查
                        if (isNeedSetCache) {
                            setCache(name);
                        }
                    }
                }
                else {
                    setCache(name);
                }
            }
        }
    }
    else {
        log.info(intl.get('autoInstall', { name }));
        await install_one_1.default(name);
    }
    const pkg = fs_extra_1.default.readJsonSync(pkgPath, { throws: false }) || {};
    let mod;
    try {
        mod = getEsModule_1.default(require(modulePath));
    }
    catch (e) {
        mod = {};
        index_7.default(e);
        // log.error(intl.get('getModuleErr', { modulePath }));
        // log.error(e);
        throw e;
    }
    // TODO 发送log记录，由于调用插件时，也会调用到套件，所以这里只有插件调用的时候才发送log
    // const pluginPrefix = utils.pluginPrefix();
    // if (!returnPkg && name.indexOf(pluginPrefix) !== -1) {
    // 	log.debug(`${name} 插件开始发送日志...`);
    // 	report.module(utils.fullName(name));
    // }
    return returnPkg ? pkg : mod;
}
exports.default = get;
