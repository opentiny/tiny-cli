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
/**
 * @desc: 本地模块列表
 */

import home from '../home/index';
import logs from '../log/index';
import fs from 'fs-extra';
import * as path from 'path';
import utils from './utils';

const log = logs('core-module');

/**
 * 列出所有本地模块
 * @param options object {type (按类型筛选): 'toolkit | plugin'}
 * @returns {Array}
 */
function localList(options?: any) {
  options = options || {};
  const modulesPath = home.getModulesPath();
  let modulePkgs: any[] = [];

  const homePath = home.getHomePath();
  const homePkgPath = path.resolve(homePath, 'package.json');
  if (fs.existsSync(homePkgPath)) {
    const homePkg = fs.readJsonSync(homePkgPath);
    if (homePkg.dependencies) {
      Object.keys(homePkg.dependencies).forEach((item) => {
        const pkgPath = path.resolve(modulesPath, item, 'package.json');
        if (fs.existsSync(pkgPath)) {
          const modPkg = fs.readJsonSync(pkgPath);
          modulePkgs.push({
            name: modPkg.name,
            description: modPkg.description,
            chName: modPkg.tinyOption && modPkg.tinyOption.chName ? modPkg.tinyOption.chName : modPkg.description
          });
        }
      });
    }
  }

  modulePkgs = options.type ? utils.moduleFilter(modulePkgs, options.type) : modulePkgs;

  log.debug('所有本地模块: %o', modulePkgs);

  return modulePkgs;
}

export default localList;
