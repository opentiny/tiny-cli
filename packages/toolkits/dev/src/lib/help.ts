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
'use strict';

import chalk from 'chalk';
import { cliConfig } from '@opentiny/cli-devkit';

export default function () {
  const tool = cliConfig.getBinName();
  const help = `
tiny-toolkit-dev Plugin help info:  

 $ ${tool} link                # 链接当前目录至本地tiny仓库
 $ ${tool} publish             # 发布项目至tnpm
 $ ${tool} help                # 显示套件帮助信息
 
`;
  process.stdout.write(chalk.green(help));
}
