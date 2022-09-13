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
exports.set = exports.getToolkitName = exports.get = exports.getAll = exports.exist = exports.getConfigPath = exports.getConfigName = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("../intl/index"));
const index_2 = __importDefault(require("../log/index"));
const index_3 = __importStar(require("../report/index"));
const locale_1 = __importDefault(require("./locale"));
const ast_analyze_1 = __importDefault(require("./ast-analyze"));
const index_4 = require("../cli-config/index");
const log = index_2.default("core-config");
const CWD = process.cwd();
/**
* 获取配置文件的名称
* @return {string}
*/
function getConfigName() {
    return process.env[index_4.PROCESS_ENV_CONFIG_FILE] || index_4.DEFAULT_CONFIG_FILE;
}
exports.getConfigName = getConfigName;
/**
 * 获取config.js的文件路径
 */
function getConfigPath() {
    return process.env[index_4.PROCESS_ENV_CONFIG_PATH] || CWD;
}
exports.getConfigPath = getConfigPath;
/**
* 当前目录下是否存在aio.config.js文件
* @param {string} dir 需要判断文件是否存在的目录,可选,默认取值:当前运行目录
*/
function exist(dir) {
    const cwd = dir || getConfigPath();
    const configPath = path.join(cwd, getConfigName());
    return fs.existsSync(configPath);
}
exports.exist = exist;
/**
* 获取整个pi.config.js文件的内容
*/
function getAll(dir) {
    const cwd = dir || getConfigPath();
    const configName = getConfigName();
    // 先判断文件是否存在,存在的话才读取
    if (!exist(cwd)) {
        return null;
    }
    // 直接使用require的话,会有缓存， 需要先删除 require 的缓存
    const configPath = path.join(cwd, configName);
    delete require.cache[configPath];
    try {
        const file = require(configPath);
        log.debug("get %s , file = %o", configName, file);
        return file;
    }
    catch (e) {
        const intl = new index_1.default(locale_1.default);
        log.error(intl.get("readConfigError", { file: configName }));
        log.error(intl.get("moreDetail"));
        log.error(e && e.stack);
        index_3.default.error(e.code || index_3.ErrorType.MODULE_NOT_FOUND, e.stack || e);
        return process.exit(1);
    }
}
exports.getAll = getAll;
/**
* 根据key获取aio.config.js的单个对象
* @param key 配置的键名
* @param dir 配置文件的路径
* @return object
*/
function get(key, dir) {
    const file = this.getAll(dir);
    log.debug("key = %s ,all config = %o", key, file);
    return file ? file[key] : null;
}
exports.get = get;
/**
   * 获取套件的名字
   */
function getToolkitName(dir) {
    const config = this.getAll(dir || "");
    if (config && config.toolkit) {
        return config.toolkit;
    }
    return null;
}
exports.getToolkitName = getToolkitName;
/**
   * 设置aio.config.js的属性值,写入相关内容
   * @param key aio.config.js中的key
   * @param value key对应的value
   * @param dir 配置文件路径
   */
function set(key, value, dir) {
    const cwd = dir || getConfigPath();
    const configName = getConfigName();
    const filePath = path.join(cwd, configName);
    // 读取文件
    const code = fs.readFileSync(filePath, 'utf8');
    const source = ast_analyze_1.default(code, key, value);
    log.debug('set %s file source string = %o', configName, source);
    fs.writeFileSync(filePath, source);
}
exports.set = set;
exports.default = {
    exist,
    set,
    get,
    getAll,
    getConfigName,
    getConfigPath,
    getToolkitName
};
