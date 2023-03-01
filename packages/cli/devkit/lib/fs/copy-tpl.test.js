"use strict";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
const copy_tpl_1 = __importDefault(require("./copy-tpl"));
const fixtures = path.resolve(__dirname, 'fixtures');
const dirSrc = path.resolve(fixtures, 'dir-src');
const dirDist = path.resolve(fixtures, 'dir-dist');
ava_1.default.before(() => {
    if (!fs_extra_1.default.existsSync(fixtures)) {
        fs_extra_1.default.copySync(path.join(__dirname, '../../src/fs/fixtures'), fixtures);
    }
    if (fs_extra_1.default.existsSync(dirDist)) {
        fs_extra_1.default.removeSync(dirDist);
    }
    // 复制文件
    copy_tpl_1.default(dirSrc, dirDist, { name: 'test', rename: 'newname-dir' }, {
        ignore: ['zzz.js'],
        ignoreEjs: [path.join(dirSrc, 'bbb.js')],
        rename: function (filename) {
            if (filename === 'xxx.js') {
                return 'yyy.js';
            }
            return filename;
        },
        notTextFile: ['.dd'],
    });
});
ava_1.default.after(() => {
    if (fs_extra_1.default.existsSync(dirDist)) {
        fs_extra_1.default.removeSync(dirDist);
    }
});
ava_1.default('# 创建目标目录', (t) => {
    chai_1.expect(fs_extra_1.default.existsSync(dirDist)).to.be.equals(true);
    t.pass();
});
ava_1.default('# 创建目标目录下需要复制过来的文件', (t) => {
    const abc = path.resolve(dirDist, 'abc.js');
    chai_1.expect(fs_extra_1.default.existsSync(abc)).to.be.equals(true);
    t.pass();
});
ava_1.default('# 正常进行变量替换', (t) => {
    const abc = path.resolve(dirDist, 'abc.js');
    const abcDist = path.resolve(dirSrc, '../dir-dist-abc.js');
    chai_1.expect(fs_extra_1.default.existsSync(abc)).to.be.equals(fs_extra_1.default.existsSync(abcDist));
    t.pass();
});
ava_1.default('# 不在目标目录下面创建需要忽略的文件', (t) => {
    chai_1.expect(fs_extra_1.default.existsSync(path.resolve(dirDist, 'zzz.js'))).to.be.equals(false);
    t.pass();
});
ava_1.default('# 对文件名进行替换', (t) => {
    const yyy = path.resolve(dirDist, 'yyy.js');
    const xxx = path.resolve(dirSrc, 'xxx.js');
    chai_1.expect(fs_extra_1.default.existsSync(yyy)).to.be.equals(true);
    chai_1.expect(fs_extra_1.default.readFileSync(yyy)).to.be.deep.equals(fs_extra_1.default.readFileSync(xxx));
    t.pass();
});
ava_1.default('# 忽略ejs文件', (t) => {
    const bbb = path.resolve(dirDist, 'bbb.js');
    chai_1.expect(fs_extra_1.default.existsSync(bbb)).to.be.equals(true);
    const ejsTpl = fs_extra_1.default.readFileSync(bbb).indexOf('<{%=name%}>') !== -1;
    chai_1.expect(ejsTpl).to.be.equals(true);
    t.pass();
});
ava_1.default('# copy非文本文件', (t) => {
    const gz = path.resolve(dirDist, 'a.tar.gz');
    chai_1.expect(fs_extra_1.default.existsSync(gz)).to.be.equals(true);
    t.pass();
});
ava_1.default.only('# copy非文本文件，参数中配置的非文本类型', (t) => {
    const gz = path.resolve(dirDist, 'a.dd');
    chai_1.expect(fs_extra_1.default.existsSync(gz)).to.be.equals(true);
    t.pass();
});
ava_1.default('# copy空目录过去', (t) => {
    const emptyDir = path.resolve(dirDist, 'empty-folder');
    chai_1.expect(fs_extra_1.default.lstatSync(emptyDir).isDirectory()).to.be.equals(true);
    t.pass();
});
ava_1.default('# 重命名文件夹', (t) => {
    const emptyDir = path.resolve(dirDist, 'newname-dir');
    chai_1.expect(fs_extra_1.default.lstatSync(emptyDir).isDirectory()).to.be.equals(true);
    t.pass();
});
