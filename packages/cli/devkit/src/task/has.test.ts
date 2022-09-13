import test from 'ava';
import has from './has';
import { expect } from 'chai';

test('# has 判断是否有任务 有 __toolkitCommand__ 的情况', async (t) => {
	const tasks1 = [
		{
			command: 'echo 1',
		},
		{
			command: '__toolkitCommand__',
		},
		{
			command: 'echo 2',
		},
	];
	const tasks2 = [
		{
			command: '__toolkitCommand__',
		},
		{
			command: 'echo 2',
		},
	];
	const res1 = has(tasks1, 'before');
	const res2 = has(tasks1, 'after');
	const res3 = has(tasks2, 'before');
	const res4 = has(tasks2, 'after');

	expect(res1).to.be.equal(true);
	expect(res2).to.be.equal(true);
	expect(res3).to.be.equal(false);
	expect(res4).to.be.equal(true);
	t.pass();
});

test('# 无 __toolkitCommand__ 的情况', async (t) => {
	const tasks1 = [
		{
			command: 'echo 1',
		},
	];

	const res1 = has(tasks1, 'before');
	const res2 = has(tasks1, 'after');

	expect(res1).to.be.equal(true);
	expect(res2).to.be.equal(false);
	t.pass();
});
