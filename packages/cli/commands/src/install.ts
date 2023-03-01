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
import { logs, modules, Intl } from '@opentiny/cli-devkit';
import message from './locale/index';

const log = logs('core-commands');

export default async (cliArgs: any) => {
  const name = cliArgs.pop();
  if (name) {
    await modules.installOne(name);
  } else {
    const intl = new Intl(message);
    log.warn(intl.get('installTips'));
  }
};
