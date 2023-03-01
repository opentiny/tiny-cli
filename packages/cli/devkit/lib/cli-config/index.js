"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleEntry = exports.setModuleEntry = exports.getScope = exports.getBinName = exports.ENV_RUN = exports.PROCESS_ENV_RUN = exports.PROCESS_ENV_MODULE_ENTRY = exports.PROCESS_ENV_CLI_PACKAGE = exports.PROCESS_ENV_CLI_VERSION = exports.PROCESS_ENV_SCOPE = exports.PROCESS_ENV_BIN = exports.PROCESS_ENV_CLI_ENV = exports.PROCESS_ENV_CONFIG_PATH = exports.PROCESS_ENV_CONFIG_FILE = exports.PROCESS_ENV_HOME_FOLDE = exports.PROCESS_ENV_HOME_PATH = exports.PROCESS_ENV_LOCALE = exports.DEFAULT_SCOPE = exports.DEFAULT_BIN = exports.DEFAULT_HOME_FOLDER = exports.FILE_USER = exports.DEFAULT_CONFIG_FILE = exports.FILE_ENV = exports.FILE_CACHE = exports.FILE_LOCALE = void 0;
/**
 * cli 多语言文案文件
 */
exports.FILE_LOCALE = 'aio.locale.json';
/**
 * cli 多语言文案文件
 */
exports.FILE_CACHE = 'aio.cache.json';
/**
 * cli 环境设置
 */
exports.FILE_ENV = 'aio.env.json';
/**
 * cli所需的项目配置文件
 */
exports.DEFAULT_CONFIG_FILE = 'aio.config.js';
/**
 * cli所需的项目配置文件
 */
exports.FILE_USER = 'aio.user.json';
/**
 * cli默认的根目录文件夹
 */
exports.DEFAULT_HOME_FOLDER = '.aio';
/**
 * cli运行命令名称
 */
exports.DEFAULT_BIN = 'aio';
/**
 * 项目scope
 */
exports.DEFAULT_SCOPE = 'cloud';
/**
 * process.env 中的locale设置
 */
exports.PROCESS_ENV_LOCALE = 'AIO_LOCALE';
/**
 * process.env 中 cli的根目录所在的路径
 */
exports.PROCESS_ENV_HOME_PATH = 'AIO_HOME_PATH';
/**
 * process.env 中 cli的根目录文件夹名称
 */
exports.PROCESS_ENV_HOME_FOLDE = 'AIO_HOME_FOLDER';
/**
 * process.env 中 记录的cli配置文件名称key
 */
exports.PROCESS_ENV_CONFIG_FILE = 'AIO_CONFIG_FILE';
/**
 * process.env 中 记录的cli配置文件路径key
 */
exports.PROCESS_ENV_CONFIG_PATH = 'AIO_CONFIG_PATH';
/**
 * process.env 中记录cli当前环境的key
 */
exports.PROCESS_ENV_CLI_ENV = 'AIO_ENV';
/**
 * process.env 中 记录的cli命令名称key
 */
exports.PROCESS_ENV_BIN = 'AIO_BIN';
/**
 * process.env 中 记录项目scope的key
 */
exports.PROCESS_ENV_SCOPE = 'AIO_SCOPE';
/**
 * process.env 中 记录的cli version key
 */
exports.PROCESS_ENV_CLI_VERSION = 'AIO_VERSION';
/**
 * process.env 中 记录的cli name key
 */
exports.PROCESS_ENV_CLI_PACKAGE = 'AIO_PACKAGE';
/**
 * process.env 中 记录用户在控制台输入的真实命令
 */
exports.PROCESS_ENV_MODULE_ENTRY = 'AIO_MODULE_ENTRY';
/**
 * process.env 中记录当前cli的运行环境，可选的值有Node/FUXI
 */
exports.PROCESS_ENV_RUN = 'AIO_RUN_ENV';
/**
 * CLI当前的运行环境
 */
var ENV_RUN;
(function (ENV_RUN) {
    ENV_RUN["NONE"] = "none";
    ENV_RUN["FUXI"] = "fuxi";
})(ENV_RUN = exports.ENV_RUN || (exports.ENV_RUN = {}));
/**
 * 获取运行时的aio命令
 */
function getBinName() {
    return process.env[exports.PROCESS_ENV_BIN] || exports.DEFAULT_BIN;
}
exports.getBinName = getBinName;
/**
 * 获取项目scope
 */
function getScope() {
    return process.env[exports.PROCESS_ENV_SCOPE] || exports.DEFAULT_SCOPE;
}
exports.getScope = getScope;
/**
 *
 * @param name
 */
function setModuleEntry(name) {
    process.env[exports.PROCESS_ENV_MODULE_ENTRY] = name;
}
exports.setModuleEntry = setModuleEntry;
function getModuleEntry() {
    return process.env[exports.PROCESS_ENV_MODULE_ENTRY] || '';
}
exports.getModuleEntry = getModuleEntry;
exports.default = {
    FILE_CACHE: exports.FILE_CACHE,
    FILE_ENV: exports.FILE_ENV,
    FILE_LOCALE: exports.FILE_LOCALE,
    FILE_USER: exports.FILE_USER,
    PROCESS_ENV_BIN: exports.PROCESS_ENV_BIN,
    PROCESS_ENV_SCOPE: exports.PROCESS_ENV_SCOPE,
    PROCESS_ENV_CLI_ENV: exports.PROCESS_ENV_CLI_ENV,
    PROCESS_ENV_CONFIG_FILE: exports.PROCESS_ENV_CONFIG_FILE,
    PROCESS_ENV_CONFIG_PATH: exports.PROCESS_ENV_CONFIG_PATH,
    PROCESS_ENV_HOME_FOLDE: exports.PROCESS_ENV_HOME_FOLDE,
    PROCESS_ENV_HOME_PATH: exports.PROCESS_ENV_HOME_PATH,
    PROCESS_ENV_LOCALE: exports.PROCESS_ENV_LOCALE,
    PROCESS_ENV_CLI_VERSION: exports.PROCESS_ENV_CLI_VERSION,
    PROCESS_ENV_CLI_PACKAGE: exports.PROCESS_ENV_CLI_PACKAGE,
    PROCESS_ENV_RUN: exports.PROCESS_ENV_RUN,
    ENV_RUN,
    getBinName,
    getModuleEntry,
    setModuleEntry,
    DEFAULT_BIN: exports.DEFAULT_BIN,
    DEFAULT_SCOPE: exports.DEFAULT_SCOPE,
    DEFAULT_CONFIG_FILE: exports.DEFAULT_CONFIG_FILE,
    DEFAULT_HOME_FOLDER: exports.DEFAULT_HOME_FOLDER,
};
