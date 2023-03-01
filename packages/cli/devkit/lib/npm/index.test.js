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
const npm = __importStar(require("./index"));
const ava_1 = __importDefault(require("ava"));
ava_1.default('# 测试安装状态', async (t) => {
    await npm.install('jquery');
    t.pass();
});
ava_1.default('# has 判断模块是否存在', async (t) => {
    const has = await npm.has('@cloud/expense');
    t.true(has);
});
ava_1.default('# lastes 获取模块的信息', async (t) => {
    const data = await npm.latest('@cloud/expense');
    t.true(typeof data === 'object');
    t.is('@cloud/expense', data.name);
});
