/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import test from 'ava';
import has from './has';
import { expect } from 'chai';

test('# has 判断是否有任务 有 $task 的情况', async (t) => {
  const tasks1 = [
    {
      command: 'echo 1'
    },
    {
      command: '$task'
    },
    {
      command: 'echo 2'
    }
  ];
  const tasks2 = [
    {
      command: '$task'
    },
    {
      command: 'echo 2'
    }
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

test('# 无 $task 的情况', async (t) => {
  const tasks1 = [
    {
      command: 'echo 1'
    }
  ];

  const res1 = has(tasks1, 'before');
  const res2 = has(tasks1, 'after');

  expect(res1).to.be.equal(true);
  expect(res2).to.be.equal(false);
  t.pass();
});
