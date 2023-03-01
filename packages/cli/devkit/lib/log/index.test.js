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
const shelljs_1 = __importDefault(require("shelljs"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const process_1 = __importDefault(require("process"));
const logPath = path.join(__dirname, 'helpers/log');
ava_1.default.before(() => {
    process_1.default.env.AIO_LOG_PATH = logPath;
});
ava_1.default.after(() => {
    fs.removeSync(logPath);
});
ava_1.default('# level检查CLI输出是否正确', (t) => {
    const targetScript = path.join(__dirname, 'helpers', 'logger-test.js');
    const result = shelljs_1.default.exec(`node ${targetScript}`, { stdio: 'pipe' }).stdout.toString();
    // 包含label
    t.true(result.includes('[core-module]'));
    // 打印字符串
    t.true(result.includes('info message'));
    // 打印对象
    t.true(result.includes('{"a":1}'));
    // 打印错误
    t.true(result.includes('Error: an error'));
    t.true(result.includes('at Object.<anonymous>'));
    // 打印多个参数
    t.true(result.includes('["a","b","c"]'));
    // debug不打印出来
    t.false(result.includes('debug message'));
});
ava_1.default('# level检查LOG文件输出是否正确', (t) => {
    const targetScript = path.join(__dirname, 'helpers', 'logger-test.js');
    shelljs_1.default.exec(`node ${targetScript}`, { stdio: 'pipe' });
    const logFile = path.join(logPath, `${new Date().toISOString().split('T')[0]}.log`);
    const result = fs.readFileSync(logFile);
    // 包含label
    t.true(result.includes('[core-module]'));
    // 不打印字符串
    t.false(result.includes('info message'));
    // 不打印对象
    t.false(result.includes('{"a":1}'));
    // 不打印多个参数
    t.false(result.includes('["a","b","c"]'));
    // 不打印debug
    t.false(result.includes('debug message'));
    // 打印错误
    t.true(result.includes('Error: an error'));
    t.true(result.includes('at Object.<anonymous>'));
    // 打印warn
    t.true(result.includes('warn message'));
});
