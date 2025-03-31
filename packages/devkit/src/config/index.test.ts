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
'use strict';

import * as path from 'path';
// import proxyquire from 'proxyquire';
import fs from 'fs-extra';
import test, { ExecutionContext } from 'ava';
import * as config from './index';
import { DEFAULT_CONFIG_FILE } from '../cli-config/index';
import { expect } from 'chai';

test.before((t: ExecutionContext<{ mockCwd: string; source: string; mock: string; config?: object }>) => {
  const mockCwd = path.resolve(__dirname, 'fixtures');
  const source = path.resolve(mockCwd, 'mock.config.js');
  const mock = path.resolve(mockCwd, DEFAULT_CONFIG_FILE);
  // const config = proxyquire('../lib/index', {});
  t.context = {
    mockCwd,
    source,
    mock
    // config
  };
  fs.copySync(source, mock);
});

test.after((t: ExecutionContext<{ mock: string }>) => {
  if (fs.existsSync(t.context.mock)) {
    fs.unlinkSync(t.context.mock);
  }
});

test('# get 获取数据', (t: ExecutionContext<{ mockCwd: string }>) => {
  t.deepEqual(config.get('abc', t.context.mockCwd), {
    xyz: 22
  });
});

test('# set 设置数据', (t: ExecutionContext<{ mockCwd: string }>) => {
  const value = {
    xyz: 23
  };
  config.set('abc', value, t.context.mockCwd);
  t.deepEqual(config.get('abc', t.context.mockCwd), value);
});

test('# set value是一个字符串对象', (t: ExecutionContext<{ mockCwd: string }>) => {
  config.set(
    'gg',
    `
//这是一行注释
{
  "good" : "yes"
}
      `,
    t.context.mockCwd
  );
  t.deepEqual(config.get('gg', t.context.mockCwd), {
    good: 'yes'
  });
});

test('# set value是一个带.的字符串', (t: ExecutionContext<{ mockCwd: string }>) => {
  config.set('xx.yy', '123', t.context.mockCwd);
  t.deepEqual(config.get('xx', t.context.mockCwd), {
    yy: 123
  });
});

test('# set value是一个带.的字符串，复杂对象', (t: ExecutionContext<{ mockCwd: string }>) => {
  config.set(
    'tasks.build',
    [
      {
        command: 'echo 44'
      }
    ],
    t.context.mockCwd
  );
  expect(config.get('tasks', t.context.mockCwd)).to.have.property('build');
  expect(config.get('tasks', t.context.mockCwd).build[0]).to.have.property('command');
  t.pass();
});

test('# getToolkitName 获取套件的名字', (t: ExecutionContext<{ mockCwd: string }>) => {
  const toolkit = config.getToolkitName(t.context.mockCwd);
  expect(toolkit).to.be.equal('@opentiny/tiny-toolkit-dev');
  t.pass();
});

test('# getConfigName 获取配置文件的名称', (t) => {
  const name = config.getConfigName();
  expect(name).to.be.equal('tiny.config.js');
  t.pass();
});
