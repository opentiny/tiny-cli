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
import npm from '../npm/index';
/**
 * 线上模块是否存在
 */
async function onlineExist(name: string): Promise<boolean> {
  const latest = await npm.latest(name);
  // 如果description 为 delete的话，则排查掉该模块，因为publish 之后，是不允许unpublish的
  return !!(latest && latest.description !== 'delete');
}

export default onlineExist;
