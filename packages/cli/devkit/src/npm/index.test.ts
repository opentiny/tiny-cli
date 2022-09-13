import * as npm from './index';
import test from 'ava';

test('# 测试安装状态', async t => {
	await npm.install('jquery');
	t.pass();
});

test('# has 判断模块是否存在', async t => {
	const has = await npm.has('@cloud/expense');
	t.true(has);
});

test('# lastes 获取模块的信息', async t => {
	const data = await npm.latest('@cloud/expense');
	t.true(typeof data === 'object');
	t.is('@cloud/expense', data!.name);
});
