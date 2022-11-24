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
import { logs } from '@opentiny/cli-devkit';

const log = logs('tiny-plugin-link');

/**
 * 控制台传入的参数
 */
export interface CliOption {
  clientArgs: any;
  clientOptions: any;
}

export default async function(options?: CliOption) {
  log.info('控制台输入的参数为： %o', options.clientArgs);
  log.info('控制台输入的选项为： %o', options.clientOptions);
  log.info('这是第一条插件命令111');
}
