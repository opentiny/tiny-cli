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
import fs from 'fs';
import * as path from 'path';
import spawn from 'cross-spawn';
import { logs } from '@opentiny/cli-devkit';
import { CliOption } from './interfaces';

const log = logs('@/tiny-toolkit-docs');
const cwd = process.cwd();

export default function(options?: CliOption) {
  log.info('控制台输入的参数为： %o', options.clientArgs);
  log.info('控制台输入的选项为： %o', options.clientOptions);

  if (!fs.existsSync(path.resolve(cwd, 'webpack.config.js'))) {
    log.error('未发现 webpack.config.js 文件');
    return;
  }

  log.info('项目打包中...');
  const cli = spawn(
    './node_modules/.bin/webpack',
    ['--config', './webpack.config.js'],
    { stdio: 'inherit' }
  );

  cli.on('close', status => {
    if (status === 0) {
      log.success('打包完成');
    } else {
      log.error('打包失败', status);
    }
  });
}
