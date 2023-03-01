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
exports.EntryModuleEnv = exports.cleanHomeDir = exports.initHomeDir = exports.getModulesPath = exports.getHomePath = void 0;
const debug_1 = __importDefault(require("debug"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const del = __importStar(require("del"));
const os = __importStar(require("os"));
const rimraf_1 = __importDefault(require("rimraf"));
const index_1 = require("../cli-config/index");
const debug = debug_1.default('core-home');
let userHomeFolder = '';
let userHomePath = '';
/**
 * 获取cli的home路径
 * AIO_HOME_FOLDER 作用：可以自定义aio的核心目录，方便开发第三方cli工具进行定制
 * AIO_HOME 作用：方便单元测试时更改目录结构
 * @returns {string} 返回路径字符串
 */
function getHomePath() {
    userHomeFolder = process.env[index_1.PROCESS_ENV_HOME_FOLDE] || index_1.DEFAULT_HOME_FOLDER;
    userHomePath = process.env[index_1.PROCESS_ENV_HOME_PATH] || os.homedir();
    return path.resolve(userHomePath, userHomeFolder);
}
exports.getHomePath = getHomePath;
/**
 * 获取cli模块的安装路径
 * @returns {string} 返回路径字符串
 */
function getModulesPath() {
    const cliPath = getHomePath();
    const modulesPath = path.resolve(cliPath, 'node_modules');
    debug('aio module path = %s', modulesPath);
    return modulesPath;
}
exports.getModulesPath = getModulesPath;
/**
 * 初始化home目录,并将信息缓存至process.env中
 */
function initHomeDir() {
    const cliPath = getHomePath();
    if (!fs.existsSync(cliPath)) {
        fs.mkdirsSync(cliPath);
    }
    // 缓存home信息到env里面
    if (!process.env[index_1.PROCESS_ENV_HOME_FOLDE]) {
        process.env[index_1.PROCESS_ENV_HOME_FOLDE] = userHomeFolder;
    }
    if (!process.env[index_1.PROCESS_ENV_HOME_PATH]) {
        process.env[index_1.PROCESS_ENV_HOME_PATH] = userHomePath;
    }
}
exports.initHomeDir = initHomeDir;
/**
 * 清理Home目录内容
 * 用户手工删除是没影响的，aio会验证并初始化
 * 返回删除成功与否
 */
function cleanHomeDir() {
    const homePath = getHomePath();
    const cliModulesPath = getModulesPath();
    let result = {
        success: true,
        removePath: cliModulesPath,
    };
    if (fs.existsSync(cliModulesPath)) {
        // 清除aio.*.json的配置文件
        const paths = del.sync([`aio.*.json`, `package.json`, `*.yaml`, 'package-lock.json'], {
            cwd: homePath,
        });
        debug('clear aio.*.json = %o', paths);
        //  windows下可能存在路径过长无法清除的情况，报错后提示手动删除
        try {
            rimraf_1.default.sync(cliModulesPath);
        }
        catch (e) {
            result.success = false;
            console.error(`${cliModulesPath} 删除失败，请手动删除该文件夹！`);
        }
        debug('remove aio modules path = %s', cliModulesPath);
    }
    return result;
}
exports.cleanHomeDir = cleanHomeDir;
exports.EntryModuleEnv = 'AIO_ENTRY_MODULE';
exports.default = {
    getHomePath,
    getModulesPath,
    initHomeDir,
    cleanHomeDir,
    EntryModuleEnv: exports.EntryModuleEnv,
};
