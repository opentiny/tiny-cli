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
import * as path from 'path';
import test from 'ava';
import fs from 'fs-extra';
import home from '../home/index';
import module from './index';
import { PROCESS_ENV_HOME_PATH, PROCESS_ENV_HOME_FOLDE, PROCESS_ENV_BIN } from '../cli-config/index';
import { expect } from 'chai';

const mockCwd = path.resolve(__dirname);
const homeFolder = 'fixtures';

/**
 * 创建一个虚拟模块
 * @param name 模块名
 */
function createPackage(name: string) {
  const pkg = {
    name,
    version: '1.0.0',
    description: name,
    main: 'index.js'
  };
  const homeModulePath = home.getModulesPath();
  const modulePath = path.join(homeModulePath, name);
  fs.ensureDirSync(modulePath);
  fs.outputJsonSync(path.join(modulePath, 'package.json'), pkg);
  // fs.copySync(path.join(mockCwd, homeFolder, 'index.js'), path.join(modulePath, 'index.js'));
}

// function clearPackage() {
//   fs.removeSync(path.join(home.getHomePath(), FILE_CACHE));
//   fs.removeSync(home.getModulesPath());
// }

/**
 * 初始化环境
 */
function initConfig() {
  process.env[PROCESS_ENV_HOME_PATH] = mockCwd;
  process.env[PROCESS_ENV_HOME_FOLDE] = homeFolder;
  process.env[PROCESS_ENV_BIN] = 'hugo';

  createPackage('hugo-toolkit-abc');
  createPackage('hugo-plugin-defg');
}

test.beforeEach(() => {
  initConfig();
});

test.afterEach(() => {
  // clearPackage();
});

test('# 从线上 获取 一个模块', async (t) => {
  // 从线上获取
  const data = await module.get('hugo-toolkit-empty-module');
  expect(data).to.be.an('object').to.have.property('start');
  t.pass();
});

// test.only('# 从内网获取一个模块', async t => {
//   // 从线上获取
//   const data = await module.get('@opentiny/hybrid-interface');
//   expect(data)
//     .to.be.an('object')
//     .to.have.property('start');
//   t.pass()
// });

// test('# 获取本地mock tiny 插件或套件', async t => {
//   // 从线上获取
//   const data = module.get('hugo-toolkit-abc');
//   expect(data)
//     .to.be.an('object')
//     .to.have.property('start');
//   t.pass();
// });
