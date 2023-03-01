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
exports.remove = exports.has = exports.get = exports.set = exports.EnvType = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const debug_1 = __importDefault(require("debug"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = require("../cli-config/index");
const debug = debug_1.default('core-env');
// 定义一个可枚举的环境变量
var EnvType;
(function (EnvType) {
    EnvType["Green"] = "Green";
    EnvType["Yellow"] = "Yellow";
    EnvType["Red"] = "Red";
    EnvType["None"] = "None";
})(EnvType = exports.EnvType || (exports.EnvType = {}));
// 缓存env对象
let cacheEnv;
/**
 * 往配置文件(aio.env.json)写入用户自定义的环境配置
 * @param env
 */
function set(env) {
    index_1.default.initHomeDir();
    const envFile = path.join(index_1.default.getHomePath(), index_2.FILE_ENV);
    const envData = {
        env,
    };
    debug('set aio env data : %o , set aio to : %s', envData, envFile);
    cacheEnv = null;
    fs_extra_1.default.outputJsonSync(envFile, envData);
}
exports.set = set;
/**
 * 获取当前用户的环境变量
 * 优先判断process.env.AIO_ENV变量
 * @returns {EnvType} 返回可枚举的环境类型
 */
function get() {
    // 如果有环境变量,则优先使用环境变量的值
    const envGlobal = process.env[index_2.PROCESS_ENV_CLI_ENV];
    if (envGlobal && EnvType[envGlobal])
        return EnvType[envGlobal];
    // 由于该方法调用频繁,在这里使用一个cacheEnv对象做为缓存,避免频繁的IO操作
    let envData = { env: EnvType.None };
    if (cacheEnv) {
        envData = cacheEnv;
    }
    else {
        const envFile = path.join(index_1.default.getHomePath(), index_2.FILE_ENV);
        if (fs_extra_1.default.existsSync(envFile)) {
            envData = fs_extra_1.default.readJsonSync(envFile);
            cacheEnv = envData;
        }
    }
    if (envData && envData.env && EnvType[envData.env]) {
        return EnvType[envData.env];
    }
    return EnvType.None;
}
exports.get = get;
/**
 * 判断cli环境配置文件(aio.env.json)是否存在
 * 可用做cli环境是否已初始化的判断
 * @returns {boolean}
 */
function has() {
    const envFile = path.join(index_1.default.getHomePath(), index_2.FILE_ENV);
    return fs_extra_1.default.existsSync(envFile);
}
exports.has = has;
/**
 * 删除cli环境配置文件(aio.env.json)
 */
function remove() {
    fs_extra_1.default.removeSync(path.join(index_1.default.getHomePath(), index_2.FILE_ENV));
    cacheEnv = null;
}
exports.remove = remove;
exports.default = {
    set,
    get,
    has,
    remove,
};
