import chalk from 'chalk';
import * as path from 'path';
import { config, cliConfig, home, logs } from '@opentiny/cli-devkit-core';

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
