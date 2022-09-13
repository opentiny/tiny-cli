/**
 * @desc: 更新模块
 */

import { modules, npm, Intl, logs } from '@opentiny/cli-devkit-core';
import message from './locale/index';

const log = logs('core-commands');

export default async function (cliArgs: string[]) {
	const name: string = cliArgs.pop() || '';
	const intl = new Intl(message);
	const pkg = await npm.latest(name);
	if (pkg && pkg.version) {
		await modules.update(`${name}@${pkg.version}`);
	} else {
		log.error(
			intl.get('updateError', {
				name,
			})
		);
	}
}
