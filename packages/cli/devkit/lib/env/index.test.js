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
const ava_1 = __importDefault(require("ava"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const index_1 = require("../cli-config/index");
const path = __importStar(require("path"));
const Env = __importStar(require("./index"));
const index_2 = require("../cli-config/index");
let envFile;
let aioHome;
ava_1.default.before(() => {
    // 先设置aio的home目录为test/helpers;
    aioHome = process.env[index_1.PROCESS_ENV_HOME_PATH] = path.join(__dirname, 'helpers');
    fs_extra_1.default.mkdirsSync(aioHome);
    envFile = path.join(aioHome, `${index_2.DEFAULT_HOME_FOLDER}/${index_2.FILE_ENV}`);
});
ava_1.default.after(() => {
    fs_extra_1.default.removeSync(path.join(aioHome));
    delete process.env[index_1.PROCESS_ENV_HOME_PATH];
});
ava_1.default('# Env.set 设置网络环境', (t) => {
    Env.set(Env.EnvType.Green);
    const file = fs_extra_1.default.existsSync(envFile);
    const fileData = fs_extra_1.default.readJsonSync(envFile);
    // 判断文件是否存在
    t.true(file);
    // 判断文件内容
    t.is(typeof fileData, 'object');
    t.deepEqual(fileData, { env: 'Green' });
});
ava_1.default('# Env.get 通过env环境变量判断来判断', (t) => {
    process.env[index_2.PROCESS_ENV_CLI_ENV] = 'Green';
    const env = Env.get();
    t.is(env, 'Green');
    delete process.env[index_2.PROCESS_ENV_CLI_ENV];
});
ava_1.default('# Env.get 多次调用可读取缓存', (t) => {
    // 设置为内网
    Env.set(Env.EnvType.Red);
    const env = Env.get();
    t.is(env, 'Red');
    // 第二次调用时应该走的是cache
    // 先手动改一下文件内容,再判断是否为true
    fs_extra_1.default.outputJsonSync(envFile, { env: 'Green' });
    const env2 = Env.get();
    t.is(env2, 'Red');
});
ava_1.default('# Env.has 初始化后则存在配置文件', (t) => {
    Env.set(Env.EnvType.Yellow);
    const result = Env.has();
    t.true(result);
});
ava_1.default('# Env.has 尚未初始化则不存在配置文件', (t) => {
    Env.remove();
    const result = Env.has();
    t.false(result);
});
ava_1.default('# Env.remove 不存在配置文件', (t) => {
    Env.set(Env.EnvType.Green);
    Env.remove();
    const result = fs_extra_1.default.existsSync(envFile);
    t.false(result);
});
