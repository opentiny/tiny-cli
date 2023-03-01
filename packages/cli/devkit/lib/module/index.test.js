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
const ava_1 = __importDefault(require("ava"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = __importDefault(require("./index"));
const index_3 = require("../cli-config/index");
const chai_1 = require("chai");
const mockCwd = path.resolve(__dirname);
const homeFolder = 'fixtures';
/**
 * 创建一个虚拟模块
 * @param name 模块名
 */
function createPackage(name) {
    const pkg = {
        name,
        version: '1.0.0',
        description: name,
        main: 'index.js',
    };
    const homeModulePath = index_1.default.getModulesPath();
    const modulePath = path.join(homeModulePath, name);
    fs_extra_1.default.ensureDirSync(modulePath);
    fs_extra_1.default.outputJsonSync(path.join(modulePath, 'package.json'), pkg);
    // fs.copySync(path.join(mockCwd, homeFolder, 'index.js'), path.join(modulePath, 'index.js'));
}
// function clearPackage() {
//   fs.removeSync(path.join(home.getHomePath(), FILE_CACHE));
//   fs.removeSync(home.getModulesPath());
// }
/**
 * 初始化环境
 */
function initConfig() {
    process.env[index_3.PROCESS_ENV_HOME_PATH] = mockCwd;
    process.env[index_3.PROCESS_ENV_HOME_FOLDE] = homeFolder;
    process.env[index_3.PROCESS_ENV_BIN] = 'hugo';
    createPackage('hugo-toolkit-abc');
    createPackage('hugo-plugin-defg');
}
ava_1.default.beforeEach(() => {
    initConfig();
});
ava_1.default.afterEach(() => {
    // clearPackage();
});
ava_1.default('# 从线上 获取 一个模块', async (t) => {
    // 从线上获取
    const data = await index_2.default.get('hugo-toolkit-empty-module');
    chai_1.expect(data).to.be.an('object').to.have.property('start');
    t.pass();
});
// test.only('# 从内网获取一个模块', async t => {
//   // 从线上获取
//   const data = await module.get('@cui/hybrid-interface');
//   expect(data)
//     .to.be.an('object')
//     .to.have.property('start');
//   t.pass()
// });
// test('# 获取本地mock aio 插件或套件', async t => {
//   // 从线上获取
//   const data = module.get('hugo-toolkit-abc');
//   expect(data)
//     .to.be.an('object')
//     .to.have.property('start');
//   t.pass();
// });
