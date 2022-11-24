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
const createSymlink = require('@lerna/create-symlink');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
import { home, logs } from '@opentiny/cli-devkit';
const log = logs('core-core');

async function initLink(options: any) {
  const clientOptionsM = options.clientOptions.m;
  const cwd = process.cwd();
  const pkgPath = `${cwd}` + '/package.json';
  if (!fs.existsSync(pkgPath)) {
    log.error('请于package.json同级目录执行tiny link命令');
    process.exit(1);
  }

  if (!clientOptionsM) {
    // tiny link
    const pkg = require(pkgPath);
    const pkgName = pkg.name;

    // 创建/LocalCDNPath/@cloud
    const homePath = home.getHomePath();
    if (!fs.existsSync(path.join(homePath, './LocalCDNPath'))) {
      fs.mkdirSync(`${homePath}` + '/LocalCDNPath');
    }
    if (!fs.existsSync(path.join(homePath, './LocalCDNPath/@cloud'))) {
      fs.mkdirSync(`${homePath}` + '/LocalCDNPath/@cloud');
    }

    const devkitPath = path.join(homePath, './LocalCDNPath/' + `${pkgName}`);

    // link plugin to /LocalCDNPath/@cloud/...
    const sourceDevKitPath = path.join(cwd);
    if (fs.existsSync(devkitPath)) {
      rimraf.sync(devkitPath);
      // log.warn(`移除当前软链接文件： `, devkitPath, 'remove success!');
    }
    await createSymlink(sourceDevKitPath, devkitPath, 'junction');
    log.success('软链接创建成功，链接到' + `${devkitPath}`);
  } else {
    // tiny link -m @cloud/xxx
    // 将开发中的/LocalCDNPath/@cloud/... 链接到当前项目中
    const devkitPath = path.join(cwd, '/node_modules/' + `${clientOptionsM}`);

    const homePath = home.getHomePath();
    const sourceDevKitPath = path.join(
      homePath,
      './LocalCDNPath/' + `${clientOptionsM}`
    );
    if (!fs.existsSync(sourceDevKitPath)) {
      log.error(
        '本地不存在' +
          `${clientOptionsM}` +
          '软链接, 请在' +
          `${clientOptionsM}` +
          '插件中执行tinylink'
      );
      process.exit(1);
    }
    if (fs.existsSync(devkitPath)) {
      rimraf.sync(devkitPath);
      // console.log(`devkitPath = `, devkitPath, 'remove success!');
    }
    createSymlink(sourceDevKitPath, devkitPath, 'junction');
    log.success(
      `${clientOptionsM}` + '软链接创建成功，链接到' + `${devkitPath}`
    );

    // console.log('devkitPath: ' + devkitPath);
    // console.log("sourceDevKitPath" + sourceDevKitPath);
  }
}

export default initLink;
