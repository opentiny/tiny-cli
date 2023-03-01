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
const index_1 = __importDefault(require("../intl/index"));
const index_2 = __importDefault(require("../log/index"));
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const path = __importStar(require("path"));
const semver_1 = __importDefault(require("semver"));
const locale_1 = __importDefault(require("./locale"));
const index_3 = require("../cli-config/index");
const log = index_2.default('core-module');
/**
 * 版本更新日志打印
 * @param name
 * @param opt
 * @param opt.localPkg
 * @param opt.lastPkg
 * @param opt.level
 */
function updateLog(name, opt) {
    const ulog = log[opt.level || 'success'];
    const intl = new index_1.default(locale_1.default);
    let pre = '';
    let localVersion = '';
    const lastVersion = opt.lastPkg.version;
    if (opt.localPkg && opt.localPkg.version !== lastVersion) {
        localVersion = opt.localPkg.version;
        pre = intl.get('updateTo', { localVersion, lastVersion });
    }
    else {
        pre = intl.get('updateVersion', { lastVersion });
        localVersion = lastVersion;
    }
    if (opt.lastPkg.changeLog) {
        const changeLog = opt.lastPkg.changeLog.sort((a, b) => semver_1.default.lt(a.version, b.version) ? 1 : -1);
        // 在警告模式下加重提示样式
        if (opt.level === 'warn') {
            const tool = index_3.getBinName();
            const localVTip = localVersion ? intl.get('localVersion', { localVersion }) : '';
            const installTip = `${tool} install ${opt.lastPkg.name}`;
            console.log('\n');
            ulog(`******************** ${node_emoji_1.default.get('warning')} ${node_emoji_1.default.get('warning')}   ${intl.get('updateTips')}  ${node_emoji_1.default.get('warning')} ${node_emoji_1.default.get('warning')} **********************`);
            ulog(`${intl.get('recommendVersion', {
                name,
                version: chalk_1.default.green(lastVersion),
            })}${localVTip}`);
            ulog(intl.get('recommendInstall', {
                icon: node_emoji_1.default.get('point_right'),
                installTip: chalk_1.default.bgRed.bold(installTip),
            }));
        }
        ulog(`${name} ${pre}, ${intl.get('includeUpdate')}`);
        changeLog.forEach((item) => {
            if (!item.log || !item.log.length) {
                return;
            }
            if (lastVersion === localVersion) {
                if (item.version !== lastVersion) {
                    return;
                }
            }
            else if (!semver_1.default.lte(item.version, lastVersion) || !semver_1.default.gt(item.version, localVersion)) {
                return;
            }
            // 显示未更新的这几个版本log
            item.log.forEach((itemLog) => {
                ulog(` --${itemLog}`);
            });
        });
        // 在警告模式下加重提示样式
        if (opt.level === 'warn') {
            ulog(`******************************${node_emoji_1.default.get('point_up_2')} ${node_emoji_1.default.get('point_up_2')} ******************************`);
            console.log('\n');
        }
    }
}
/**
 * 解决npminstall不存在package.json时依赖无法正常安装的问题
 * @param cwd 安装路径
 * @param name 模块名称
 * @param version 版本号
 */
function addModuleToDependencies(cwd, name, version) {
    version = version || 'latest';
    let pkgFile = { dependencies: {} };
    const pkgPath = path.join(cwd, 'package.json');
    if (fs_extra_1.default.existsSync(pkgPath)) {
        pkgFile = fs_extra_1.default.readJsonSync(pkgPath);
    }
    pkgFile.dependencies[name] = version;
    fs_extra_1.default.outputJsonSync(pkgPath, pkgFile);
}
function removeModuleToDependencies(cwd, name) {
    let pkgFile;
    const pkgPath = path.join(cwd, 'package.json');
    if (!fs_extra_1.default.existsSync(pkgPath)) {
        return;
    }
    pkgFile = fs_extra_1.default.readJsonSync(pkgPath);
    delete pkgFile.dependencies[name];
    fs_extra_1.default.outputJsonSync(pkgPath, pkgFile);
}
/**
 * 获取模块的前缀
 * @returns {string|string}
 */
function prefix() {
    return process.env[index_3.PROCESS_ENV_BIN] || index_3.DEFAULT_BIN;
}
/**
 * 获取套件模块完整名字
 * @param name 可传入的参数可能是：xxx,toolkit-xxx,@opentiny/cli-toolkit-xxx
 * @returns {string}
 */
function toolkitFullName(name) {
    let full = '';
    const prefix = utils.prefix();
    const tPrefix = utils.toolkitPrefix();
    const scope = index_3.getScope();
    name = name.replace(`@${scope}/`, '');
    // 当第三方cli使用时，传入的参数如 aio-toolkit-dev ，那么能正确获取到
    if (name.indexOf(tPrefix) === 0 || name.indexOf('toolkit') > 0) {
        full = name;
    }
    else if (name.indexOf('toolkit') === 0) {
        full = `${prefix}-${name}`;
    }
    else {
        full = `${tPrefix}${name}`;
    }
    return `@${scope}/${full}`;
}
/**
 * 获取插件模块完整名字
 * 传入的可能是 @opentiny/cli-plugin-xxx plugin-xxx
 * @returns {string}
 */
function pluginFullName(name) {
    let full = '';
    const prefix = utils.prefix();
    const pPrefix = utils.pluginPrefix();
    const scope = index_3.getScope();
    name = name.replace(`@${scope}/`, '');
    // aio-plugin-xxx 的情况，和 另外有个 cui-plugin-xxx 的情况(即name不是prefix开头的)
    if (name.indexOf(pPrefix) === 0 || name.indexOf('plugin') > 0) {
        full = name;
    }
    else if (name.indexOf('plugin') === 0) {
        // plugin-xxx 的情况
        full = `${prefix}-${name}`;
    }
    else {
        full = `${pPrefix}${name}`;
    }
    return `@${scope}/${full}`;
}
/**
 * 根据传入的插件名称缩写,获取模块名称
 * @param name
 * @returns {*}
 */
function fullName(name) {
    if (name.indexOf('plugin-') > -1) {
        return pluginFullName(name);
    }
    else if (name.indexOf('toolkit-') > -1) {
        return toolkitFullName(name);
    }
    return name;
}
/**
 * 获取套件的前缀
 */
function toolkitPrefix() {
    const pre = prefix();
    return `${pre}-toolkit-`;
}
/**
 * 获取插件的前缀
 */
function pluginPrefix() {
    const pre = prefix();
    return `${pre}-plugin-`;
}
const utils = {
    moduleFilter(list, type) {
        return list.filter((item) => item.name.indexOf(`${type}-`) > -1);
    },
    toolkitPrefix,
    pluginPrefix,
    toolkitFullName,
    pluginFullName,
    fullName,
    prefix,
    UPDATE_CHECK_PRE: 'moduleCheck_',
    ONLINE_MODULE_CACHE_KEY_IN: 'onlineModuleListIn',
    ONLINE_MODULE_CACHE_KEY_OUT: 'onlineModuleListOut',
    updateLog,
    addModuleToDependencies,
    removeModuleToDependencies,
    NO_TIP_PERIOD: 3600000,
};
exports.default = utils;
