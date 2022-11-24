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
import init from './lib/init';
import link from './lib/link';
import help from './lib/help';
import publish from './lib/publish';
import build from './lib/build';
import temp from './lib/temp';

export default {
  init,
  link,
  help,
  publish,
  build,
  temp,
  default: help
};
