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
 * Created by hugo on 16/11/16.
 */
import _ from 'lodash';
import logs from '../log/index';
import Intl from '../intl/index';
import message from './locale/index';

const log = logs('core-error');

export default async function (e: any) {
  if (e.code !== 'ENOENT') {
    return false;
  }
  // 目前可能的值有spawn xx ENOENT;spawnSync xx ENOENT
  const match = e.message.match(/\s(.*)ENOENT/);
  const intl = new Intl(message);
  if (match && match[0]) {
    const module = match[1].trim();
    const installer = 'npm';
    log.error(intl.get('commandNotFound', { module }));
    // 本地模块
    if (module.indexOf('node_modules') !== -1) {
      const cmdArr = module.split('/');
      const startIdx = _.indexOf(cmdArr, 'node_modules');
      let runModule: any;

      // 直接运行命令
      if (module.indexOf('node_modules/.bin/') !== -1) {
        runModule = cmdArr[cmdArr.length - 1];
      } else if (module.indexOf('node_modules/@ali') !== -1 && cmdArr.length >= 2) {
        // 本地文件直接运行
        runModule = `${cmdArr[startIdx + 1]}/${cmdArr[startIdx + 2]}`;
      } else {
        runModule = cmdArr[startIdx + 1];
      }
      log.error(intl.get('fixLocalTips', { installer, runModule }));
    } else {
      log.error(intl.get('fixGlobalTips', { installer, module }));
    }
    return true;
  }
  return false;
}
