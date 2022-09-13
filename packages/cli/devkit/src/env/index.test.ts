import test from 'ava';
import fs from 'fs-extra';
import { PROCESS_ENV_HOME_PATH } from '../cli-config/index';
import * as path from 'path';
import * as Env from './index';
import { FILE_ENV, DEFAULT_HOME_FOLDER, PROCESS_ENV_CLI_ENV } from '../cli-config/index';

let envFile: string;
let aioHome: string;

test.before(() => {
	// 先设置aio的home目录为test/helpers;
	aioHome = process.env[PROCESS_ENV_HOME_PATH] = path.join(__dirname, 'helpers');
	fs.mkdirsSync(aioHome);
	envFile = path.join(aioHome, `${DEFAULT_HOME_FOLDER}/${FILE_ENV}`);
});

test.after(() => {
	fs.removeSync(path.join(aioHome));
	delete process.env[PROCESS_ENV_HOME_PATH];
});

test('# Env.set 设置网络环境', (t) => {
	Env.set(Env.EnvType.Green);

	const file = fs.existsSync(envFile);
	const fileData = fs.readJsonSync(envFile);
	// 判断文件是否存在
	t.true(file);
	// 判断文件内容
	t.is(typeof fileData, 'object');
	t.deepEqual(fileData, { env: 'Green' });
});

test('# Env.get 通过env环境变量判断来判断', (t) => {
	process.env[PROCESS_ENV_CLI_ENV] = 'Green';
	const env: Env.EnvType = Env.get();
	t.is(env, 'Green');
	delete process.env[PROCESS_ENV_CLI_ENV];
});

test('# Env.get 多次调用可读取缓存', (t) => {
	// 设置为内网
	Env.set(Env.EnvType.Red);
	const env: Env.EnvType = Env.get();
	t.is(env, 'Red');
	// 第二次调用时应该走的是cache
	// 先手动改一下文件内容,再判断是否为true
	fs.outputJsonSync(envFile, { env: 'Green' });
	const env2: Env.EnvType = Env.get();
	t.is(env2, 'Red');
});

test('# Env.has 初始化后则存在配置文件', (t) => {
	Env.set(Env.EnvType.Yellow);
	const result = Env.has();
	t.true(result);
});

test('# Env.has 尚未初始化则不存在配置文件', (t) => {
	Env.remove();
	const result = Env.has();
	t.false(result);
});

test('# Env.remove 不存在配置文件', (t) => {
	Env.set(Env.EnvType.Green);
	Env.remove();
	const result = fs.existsSync(envFile);
	t.false(result);
});
