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
import Intl from '../intl/index';
import logs from '../log/index';
import message from './locale/index';
import installOne from './install-one';
import localList from './local-list';

const log = logs('core-module');

/**
 * 更新模块
 * @param name
 */
async function update(name: string | undefined) {
  const options = {
    type: 'update'
  };
  if (name) {
    log.debug(`单独更新模块 ${name}`);
    await installOne(name, options);
    return;
  }
  const list = await localList();
  log.debug('更新本地列表 %o', list);
  for (let i = 0; i < list.length; i += 1) {
    // todo 先全部重新安装 ,后面再做版本判断
    await installOne(list[i].name, options);
  }
  if (list.length === 0) {
    const intl = new Intl(message);
    log.success(intl.get('updateNone'));
  }
}

export default update;
