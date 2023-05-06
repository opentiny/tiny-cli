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
import chalk from 'chalk';
import { cliConfig } from '@opentiny/cli-devkit';

export default function () {
  const tool = cliConfig.getBinName();
  const help = `
@/tiny-toolkit-docs Toolkit help info:  ${tool} [command] [option] 

 $ ${tool} start                   # Start dev server
 $ ${tool} build                   # build assets
 $ ${tool} help                    # Review help info
 
`;
  process.stdout.write(chalk.magenta(help));
}
