/**
 * Copyright (c) 2022 - present TinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import TinyPluginLink from '../src/index';
import './index.less';

const tinyPluginLink = new TinyPluginLink('#mountNode', {
  id: 123,
  user: 'xxx'
});

TinyPluginLink.num = 12; // initialize the static variable
TinyPluginLink.disp(); // invoke the static method
tinyPluginLink.get();
