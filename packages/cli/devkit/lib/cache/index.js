"use strict";
/**
 * @desc: 缓存模块
 * @author: 华宇果
 */
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
exports.clear = exports.getCacheFile = exports.set = exports.get = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = __importDefault(require("../log/index"));
const index_3 = require("../cli-config/index");
const log = index_2.default('core-cache');
/**
 * 获取缓存内容,如果不存在或已过期则返回 null
 * @param {string} key 缓存的键
 * @returns {mix}
 */
function get(key) {
    // 缓存中存在，则直接返回
    // 因为这个函数调用频率很高，缓存起来比较方便
    if (process.env[key]) {
        const cacheStr = decodeURIComponent(process.env[key] || '');
        // 判断是否是字符串对象或数组
        if (cacheStr[0] === '{' || cacheStr[0] === '[') {
            return JSON.parse(decodeURIComponent(process.env[key] || ''));
        }
        return cacheStr;
    }
    const cacheFile = getCacheFile();
    log.debug('aio缓存文件的路径:', cacheFile);
    if (!key || !fs_extra_1.default.existsSync(cacheFile)) {
        return null;
    }
    // 如果不是json文件，也不抛出异常
    let data = fs_extra_1.default.readJsonSync(cacheFile, { throws: false }) || {};
    if (typeof data !== 'object') {
        data = {};
    }
    // 有效期判断
    if (data.__expires && data.__expires[key]) {
        if (data.__expires[key] < Date.now()) {
            return null;
        }
    }
    if (data[key]) {
        // 缓存经常获取，先存起来
        process.env[key] = encodeURIComponent(JSON.stringify(data[key]));
        return data[key];
    }
    return null;
}
exports.get = get;
/**
 * 设置缓存内容
 * @param key {string} 缓存的键
 * @param value {mix} 缓存的值
 * @param options {object}
 * @param options.expires {number} 有效时长,毫秒为单位, 如 1分钟为 360000
 * @returns {boolean}
 */
function set(key, value, options) {
    const cacheFile = getCacheFile();
    options = Object.assign({ expires: null }, options);
    let data = { __expires: {} };
    if (fs_extra_1.default.existsSync(cacheFile)) {
        data = fs_extra_1.default.readJsonSync(cacheFile, { throws: false }) || {};
        if (typeof data !== 'object') {
            data = { __expires: {} };
        }
    }
    // 有效期处理
    data.__expires = data.__expires || {};
    data.__expires[key] = options.expires ? Date.now() + options.expires : null;
    data[key] = value;
    fs_extra_1.default.outputJsonSync(cacheFile, data, { spaces: 2 });
}
exports.set = set;
/**
 * 获取缓存文件
 */
function getCacheFile() {
    return path.resolve(index_1.default.getHomePath(), index_3.FILE_CACHE);
}
exports.getCacheFile = getCacheFile;
/**
 * 清除所有的缓存
 */
function clear() {
    const cacheFile = getCacheFile();
    fs_extra_1.default.removeSync(cacheFile);
}
exports.clear = clear;
exports.default = {
    get,
    set,
    getCacheFile,
    clear,
};
