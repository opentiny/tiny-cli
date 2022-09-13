'use strict';
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
// import proxyquire from 'proxyquire';
const fs_extra_1 = __importDefault(require("fs-extra"));
const ava_1 = __importDefault(require("ava"));
const config = __importStar(require("./index"));
const index_1 = require("../cli-config/index");
const chai_1 = require("chai");
ava_1.default.before((t) => {
    const mockCwd = path.resolve(__dirname, 'fixtures');
    const source = path.resolve(mockCwd, 'mock.config.js');
    const mock = path.resolve(mockCwd, index_1.DEFAULT_CONFIG_FILE);
    // const config = proxyquire('../lib/index', {});
    t.context = {
        mockCwd,
        source,
        mock,
    };
    fs_extra_1.default.copySync(source, mock);
});
ava_1.default.after((t) => {
    if (fs_extra_1.default.existsSync(t.context.mock)) {
        fs_extra_1.default.unlinkSync(t.context.mock);
    }
});
ava_1.default('# get 获取数据', (t) => {
    t.deepEqual(config.get('abc', t.context.mockCwd), {
        xyz: 22,
    });
});
ava_1.default('# set 设置数据', (t) => {
    const value = {
        xyz: 23,
    };
    config.set('abc', value, t.context.mockCwd);
    t.deepEqual(config.get('abc', t.context.mockCwd), value);
});
ava_1.default('# set value是一个字符串对象', (t) => {
    config.set('gg', `
//这是一行注释
{
  "good" : "yes"
}
      `, t.context.mockCwd);
    t.deepEqual(config.get('gg', t.context.mockCwd), {
        good: 'yes',
    });
});
ava_1.default('# set value是一个带.的字符串', (t) => {
    config.set('xx.yy', '123', t.context.mockCwd);
    t.deepEqual(config.get('xx', t.context.mockCwd), {
        yy: 123,
    });
});
ava_1.default('# set value是一个带.的字符串，复杂对象', (t) => {
    config.set('tasks.build', [
        {
            command: 'echo 44',
        },
    ], t.context.mockCwd);
    chai_1.expect(config.get('tasks', t.context.mockCwd)).to.have.property('build');
    chai_1.expect(config.get('tasks', t.context.mockCwd).build[0]).to.have.property('command');
    t.pass();
});
ava_1.default('# getToolkitName 获取套件的名字', (t) => {
    const toolkit = config.getToolkitName(t.context.mockCwd);
    chai_1.expect(toolkit).to.be.equal('@cloud/aio-toolkit-dev');
    t.pass();
});
ava_1.default('# getConfigName 获取配置文件的名称', t => {
    const name = config.getConfigName();
    chai_1.expect(name).to.be.equal('aio.config.js');
    t.pass();
});
