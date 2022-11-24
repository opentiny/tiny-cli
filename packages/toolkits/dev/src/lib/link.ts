/**
 * Copyright (c) 2022 - present OpentinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { home, logs } from '@opentiny/cli-devkit';
import * as path from 'path';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import createSymlink from '@lerna/create-symlink';
import utils from './utils';

const log = logs('tiny-toolkit-dev');
const cwd = process.cwd();

/**
 * 清除 home 目录下的 对应名字的目录,然后创建链接当前目录的软链到  home 目录下
 */
function linkToHome(src: string, pkgName: string): string {
  const modulePath = home.getModulesPath();
  const dist = path.resolve(modulePath, pkgName);
  if (fs.existsSync(dist)) {
    rimraf.sync(dist);
  }
  createSymlink(src, dist, 'junction');
  return dist;
}

export default () => {
  const pkgPath = path.resolve(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    log.error(
      '当前未找到 package.json 文件,请在 插件/套件 工程根目录里面执行此命令'
    );
    log.error('软链创建失败');
    return;
  }

  const pkg = fs.readJsonSync(pkgPath);

  if (!pkg.name) {
    log.error('无项目名');
    log.error('软链创建失败');
    return;
  }

  const dist = linkToHome(cwd, pkg.name);
  log.success(`软链创建成功, 链接到${dist}`);

  utils.setModuleCache(pkg.name);
};
