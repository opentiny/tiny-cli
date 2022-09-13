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
const path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ava_1 = __importDefault(require("ava"));
const chai_1 = require("chai");
const index_1 = require("../cli-config/index");
const cache = __importStar(require("./index"));
/**
 * 创建一个mock cache文件
 * @param cacheFile
 */
function createMockFile(cacheFile) {
    const testObj = {};
    const testKey = 'test';
    const testValue = 123;
    testObj[testKey] = testValue;
    fs_extra_1.default.outputJsonSync(cacheFile, testObj);
}
ava_1.default.before((t) => {
    const homePath = (process.env[index_1.PROCESS_ENV_HOME_PATH] = path.resolve(__dirname));
    const homeFolder = (process.env[index_1.PROCESS_ENV_HOME_FOLDE] = 'fixtures');
    t.context.home = path.join(homePath, homeFolder);
    t.context.cacheFile = path.join(homePath, homeFolder, index_1.FILE_CACHE);
    // 不存在则创建
    if (!fs_extra_1.default.existsSync(t.context.home)) {
        fs_extra_1.default.mkdirSync(path.join(t.context.home));
    }
});
ava_1.default.after((t) => {
    if (fs_extra_1.default.existsSync(t.context.cacheFile)) {
        fs_extra_1.default.removeSync(t.context.cacheFile);
        fs_extra_1.default.removeSync(t.context.home);
    }
});
ava_1.default('#cache.json 不存在的情况下 get 获取缓存', (t) => {
    if (fs_extra_1.default.existsSync(t.context.cacheFile)) {
        fs_extra_1.default.unlinkSync(t.context.cacheFile);
    }
    chai_1.expect(cache.get('testKey1')).to.be.equal(null);
    t.pass();
});
ava_1.default('#cache.json 不存在的情况下 set 设置缓存', (t) => {
    const key = 'testKey2';
    const value = Math.random();
    cache.set(key, value);
    const data = fs_extra_1.default.readJsonSync(t.context.cacheFile);
    chai_1.expect(data[key]).to.be.equals(value);
    t.pass();
});
ava_1.default('# cache.json 存在的情况下 get 获取缓存', (t) => {
    createMockFile(t.context.cacheFile);
    chai_1.expect(cache.get('test')).to.be.equal(123);
    chai_1.expect(cache.get('notExistKey')).to.be.equals(null);
    t.pass();
});
ava_1.default('# cache.json 存在的情况下 set 设置缓存', (t) => {
    const key = 'testKey2';
    const value = Math.random();
    cache.set(key, value);
    const data = fs_extra_1.default.readJsonSync(t.context.cacheFile);
    chai_1.expect(data[key]).to.be.equals(value);
    t.pass();
});
ava_1.default('# cache.json 文件异常的情况 get 获取缓存', (t) => {
    fs_extra_1.default.outputFileSync(t.context.cacheFile, '123');
    chai_1.expect(cache.get('testKey')).to.be.equal(null);
    t.pass();
});
ava_1.default('# cache.json 文件异常的情况 set 设置缓存', (t) => {
    const key = 'testKey2';
    const value = Math.random();
    cache.set(key, value);
    const data = fs_extra_1.default.readJsonSync(t.context.cacheFile);
    chai_1.expect(data[key]).to.be.equals(value);
    t.pass();
});
ava_1.default('# 缓存有效期检测 有效期内正常获取', (t) => {
    const key = 'testKey2';
    const value = Math.random();
    cache.set(key, value, {
        expires: 100,
    });
    chai_1.expect(cache.get('testKey2')).to.be.equal(value);
    t.pass();
});
ava_1.default('# 缓存有效期检测 过了有效期后获取到的值为null', (t) => {
    const key = 'testKey3';
    const value = Math.random();
    cache.set(key, value, {
        expires: 20,
    });
    return new Promise((resolve) => {
        setTimeout(() => {
            chai_1.expect(cache.get('testKey3')).to.be.equal(null);
            resolve();
            t.pass();
        }, 21);
    });
});
