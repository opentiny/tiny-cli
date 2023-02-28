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
import list from './lib/list';
import help from './lib/help';
import configure from './lib/configure';
import obs from './lib/hwc-obs';
import mysql from './lib/hwc-mysql';
import fg from './lib/hwc-fg';
import vpc from './lib/hwc-vpc';
import apig from './lib/hwc-apig';
import eip from './lib/hwc-eip';
import { installCLIOnSystem } from './core/kooCli';

const commands = (async () => {
  await installCLIOnSystem();

  return {
    help,
    configure,
    mysql,
    apig,
    obs,
    vpc,
    fg,
    eip,
    default: list,
  };
})();

export default commands;
