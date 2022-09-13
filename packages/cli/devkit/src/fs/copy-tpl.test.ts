/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as path from 'path';
import fs from 'fs-extra';
import test from 'ava';
import { expect } from 'chai';
import copyTpl from './copy-tpl';

const fixtures = path.resolve(__dirname, 'fixtures');
const dirSrc = path.resolve(fixtures, 'dir-src');
const dirDist = path.resolve(fixtures, 'dir-dist');

test.before(() => {
	if (!fs.existsSync(fixtures)) {
		fs.copySync(path.join(__dirname, '../../src/fs/fixtures'), fixtures);
	}

	if (fs.existsSync(dirDist)) {
		fs.removeSync(dirDist);
	}

	// 复制文件
	copyTpl(
		dirSrc,
		dirDist,
		{ name: 'test', rename: 'newname-dir' },
		{
			ignore: ['zzz.js'],
			ignoreEjs: [path.join(dirSrc, 'bbb.js')],
			rename: function (filename) {
				if (filename === 'xxx.js') {
					return 'yyy.js';
				}
				return filename;
			},
			notTextFile: ['.dd'],
		}
	);
});

test.after(() => {
	if (fs.existsSync(dirDist)) {
		fs.removeSync(dirDist);
	}
});

test('# 创建目标目录', (t) => {
	expect(fs.existsSync(dirDist)).to.be.equals(true);
	t.pass();
});

test('# 创建目标目录下需要复制过来的文件', (t) => {
	const abc = path.resolve(dirDist, 'abc.js');
	expect(fs.existsSync(abc)).to.be.equals(true);
	t.pass();
});

test('# 正常进行变量替换', (t) => {
	const abc = path.resolve(dirDist, 'abc.js');
	const abcDist = path.resolve(dirSrc, '../dir-dist-abc.js');
	expect(fs.existsSync(abc)).to.be.equals(fs.existsSync(abcDist));
	t.pass();
});

test('# 不在目标目录下面创建需要忽略的文件', (t) => {
	expect(fs.existsSync(path.resolve(dirDist, 'zzz.js'))).to.be.equals(false);
	t.pass();
});

test('# 对文件名进行替换', (t) => {
	const yyy = path.resolve(dirDist, 'yyy.js');
	const xxx = path.resolve(dirSrc, 'xxx.js');
	expect(fs.existsSync(yyy)).to.be.equals(true);
	expect(fs.readFileSync(yyy)).to.be.deep.equals(fs.readFileSync(xxx));
	t.pass();
});

test('# 忽略ejs文件', (t) => {
	const bbb = path.resolve(dirDist, 'bbb.js');
	expect(fs.existsSync(bbb)).to.be.equals(true);
	const ejsTpl = fs.readFileSync(bbb).indexOf('<{%=name%}>') !== -1;
	expect(ejsTpl).to.be.equals(true);
	t.pass();
});

test('# copy非文本文件', (t) => {
	const gz = path.resolve(dirDist, 'a.tar.gz');
	expect(fs.existsSync(gz)).to.be.equals(true);
	t.pass();
});

test.only('# copy非文本文件，参数中配置的非文本类型', (t) => {
	const gz = path.resolve(dirDist, 'a.dd');
	expect(fs.existsSync(gz)).to.be.equals(true);
	t.pass();
});

test('# copy空目录过去', (t) => {
	const emptyDir = path.resolve(dirDist, 'empty-folder');
	expect(fs.lstatSync(emptyDir).isDirectory()).to.be.equals(true);
	t.pass();
});

test('# 重命名文件夹', (t) => {
	const emptyDir = path.resolve(dirDist, 'newname-dir');
	expect(fs.lstatSync(emptyDir).isDirectory()).to.be.equals(true);
	t.pass();
});
