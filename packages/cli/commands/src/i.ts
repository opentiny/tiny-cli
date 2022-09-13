/**
 * 快速安装npm包
 */

import { npm, fs, logs, Intl } from '@opentiny/cli-devkit-core';
import yargs from 'yargs';
import rimraf from 'rimraf';
import * as path from 'path';
import message from './locale/index';

const log = logs('core-commands');
const argv = yargs.help(false).argv;

export default async function () {
	const modules = argv._.slice(1);
	const mPath = path.join(process.cwd(), 'node_modules');
	delete argv._;
	delete argv.$0;
	if (argv.focus && fs.existsSync(mPath)) {
		const intl = new Intl(message);
		log.info(intl.get('removeNpm'));
		rimraf.sync(mPath);
		delete argv.focus;
	}

	if (modules.length) {
		await npm.install(modules, argv);
	} else {
		await npm.installDependencies(argv);
	}
}
