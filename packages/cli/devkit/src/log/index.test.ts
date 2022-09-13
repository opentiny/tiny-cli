import test from 'ava';
import shelljs from 'shelljs';
import * as path from 'path';
import * as fs from 'fs-extra';
import process from 'process';

const logPath = path.join(__dirname, 'helpers/log');
test.before(() => {
	process.env.AIO_LOG_PATH = logPath;
});

test.after(() => {
	fs.removeSync(logPath);
});

test('# level检查CLI输出是否正确', (t) => {
	const targetScript = path.join(__dirname, 'helpers', 'logger-test.js');
	const result = shelljs.exec(`node ${targetScript}`, { stdio: 'pipe' }).stdout.toString();
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

test('# level检查LOG文件输出是否正确', (t) => {
	const targetScript = path.join(__dirname, 'helpers', 'logger-test.js');
	shelljs.exec(`node ${targetScript}`, { stdio: 'pipe' });
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
