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
import chalk from 'chalk';
import * as path from 'path';
import { config, cliConfig, home, logs } from '@opentiny/cli-devkit';

const log = logs('core-commands');

export default async function () {
	const bin = cliConfig.getBinName();

	console.log(chalk.magenta(`${bin} v${process.env[cliConfig.PROCESS_ENV_CLI_VERSION]}`));
	// 获取toolkit
	let toolkitName = config.getToolkitName();
	if (toolkitName) {
		try {
			const pkgPath = path.join(home.getModulesPath(), toolkitName, 'package.json');
			log.debug(`${toolkitName} pacage.json path = ${pkgPath}`);
			const pkg = require(pkgPath);
			console.log(chalk.magenta(`${toolkitName} v${pkg.version}`));
		} catch (e) {
			log.debug(e);
		}
	}
}
