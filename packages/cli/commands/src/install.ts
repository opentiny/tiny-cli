import { logs, modules, Intl } from '@opentiny/cli-devkit-core';
import message from './locale/index';

const log = logs('core-commands');

export default async (cliArgs: any) => {
	let name = cliArgs.pop();
	if (name) {
		await modules.installOne(name);
	} else {
		const intl = new Intl(message);
		log.warn(intl.get('installTips'));
	}
};
