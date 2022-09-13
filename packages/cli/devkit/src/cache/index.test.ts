import * as path from 'path';
import fs from 'fs-extra';
import test, { ExecutionContext } from 'ava';
import { expect } from 'chai';
import { FILE_CACHE, PROCESS_ENV_HOME_PATH, PROCESS_ENV_HOME_FOLDE } from '../cli-config/index';
import * as cache from './index';

/**
 * 创建一个mock cache文件
 * @param cacheFile
 */
function createMockFile(cacheFile: string) {
	const testObj = {};
	const testKey = 'test';
	const testValue = 123;
	testObj[testKey] = testValue;
	fs.outputJsonSync(cacheFile, testObj);
}

test.before((t: ExecutionContext<{ home: string, cacheFile: string }>) => {
	const homePath = (process.env[PROCESS_ENV_HOME_PATH] = path.resolve(__dirname));
	const homeFolder = (process.env[PROCESS_ENV_HOME_FOLDE] = 'fixtures');
	t.context.home = path.join(homePath, homeFolder);
	t.context.cacheFile = path.join(homePath, homeFolder, FILE_CACHE);
	// 不存在则创建
	if (!fs.existsSync(t.context.home)) {
		fs.mkdirSync(path.join(t.context.home));
	}
});

test.after((t: ExecutionContext<{ home: string, cacheFile: string }>) => {
	if (fs.existsSync(t.context.cacheFile)) {
		fs.removeSync(t.context.cacheFile);
		fs.removeSync(t.context.home);
	}
});

test('#cache.json 不存在的情况下 get 获取缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	if (fs.existsSync(t.context.cacheFile)) {
		fs.unlinkSync(t.context.cacheFile);
	}
	expect(cache.get('testKey1')).to.be.equal(null);
	t.pass();
});

test('#cache.json 不存在的情况下 set 设置缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	const key = 'testKey2';
	const value = Math.random();
	cache.set(key, value);
	const data = fs.readJsonSync(t.context.cacheFile);
	expect(data[key]).to.be.equals(value);
	t.pass();
});

test('# cache.json 存在的情况下 get 获取缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	createMockFile(t.context.cacheFile);
	expect(cache.get('test')).to.be.equal(123);
	expect(cache.get('notExistKey')).to.be.equals(null);
	t.pass();
});

test('# cache.json 存在的情况下 set 设置缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	const key = 'testKey2';
	const value = Math.random();
	cache.set(key, value);

	const data = fs.readJsonSync(t.context.cacheFile);
	expect(data[key]).to.be.equals(value);
	t.pass();
});

test('# cache.json 文件异常的情况 get 获取缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	fs.outputFileSync(t.context.cacheFile, '123');
	expect(cache.get('testKey')).to.be.equal(null);
	t.pass();
});

test('# cache.json 文件异常的情况 set 设置缓存', (t: ExecutionContext<{ cacheFile: string }>) => {
	const key = 'testKey2';
	const value = Math.random();
	cache.set(key, value);
	const data = fs.readJsonSync(t.context.cacheFile);
	expect(data[key]).to.be.equals(value);
	t.pass();
});

test('# 缓存有效期检测 有效期内正常获取', (t) => {
	const key = 'testKey2';
	const value = Math.random();

	cache.set(key, value, {
		expires: 100,
	});

	expect(cache.get('testKey2')).to.be.equal(value);

	t.pass();
});

test('# 缓存有效期检测 过了有效期后获取到的值为null', (t) => {
	const key = 'testKey3';
	const value = Math.random();

	cache.set(key, value, {
		expires: 20,
	});

	return new Promise((resolve) => {
		setTimeout(() => {
			expect(cache.get('testKey3')).to.be.equal(null);
			resolve();
			t.pass();
		}, 21);
	});
});
