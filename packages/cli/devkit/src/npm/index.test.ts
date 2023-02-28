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
import * as npm from './index';
import test from 'ava';

test('# 测试安装状态', async (t) => {
  await npm.install('jquery');
  t.pass();
});

test('# has 判断模块是否存在', async (t) => {
  const has = await npm.has('@opentiny/expense');
  t.true(has);
});

test('# lastes 获取模块的信息', async (t) => {
  const data = await npm.latest('@opentiny/expense');
  t.true(typeof data === 'object');
  t.is('@opentiny/expense', data!.name);
});
