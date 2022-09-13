/**
 * @desc: 列出所有的套件,插件
 */

import { Intl, logs, modules } from '@opentiny/cli-devkit-core';
import chalk from 'chalk';
import message from './locale/index';
import { getPadding } from './utils';

const log = logs('core-commands');

function printListByType(type: string, moduleList: any[]) {
	let tmpString;
	moduleList
		.filter((item) => !!item.name.match(type))
		.forEach((item) => {
			const padding = getPadding(item.name, 35);

			tmpString = [
				'  ',
				chalk.green(item.name),
				chalk.gray(padding),
				item.chName ? item.chName : '暂无描述',
			].join('');
			console.log(tmpString);
		});
}

export default async function (cliArgs: string[], _options: any) {
	const type = cliArgs.pop();
	const intl = new Intl(message);
	const fixType = type === 'plugin' || type === 'toolkit' ? type : null;
	const textMap = {
		plugin: intl.get('plugin'),
		toolkit: intl.get('toolkit'),
		all: intl.get('toolkitAndPlugin'),
	};
	const text = textMap[fixType || 'all'];
	const star = fixType ? '**' : '';
	const param = { fixType };

	log.debug('module params = %o', param);
	const local = modules.localList(param);
	const online = await modules.onlineList(param);

	let newList: any[] = [];

	// merge list
	const onlineKeys = online.map((item) => {
		newList.push(item);
		return item.name;
	});

	local.forEach((item) => {
		if (onlineKeys.indexOf(item.name) === -1) {
			newList.push(item);
		}
	});

	console.log(
		chalk.italic.magenta(`\r\n${star}************** ${text} ${intl.get('list')} ******************${star}\r\n`)
	);

	if (!type) {
		console.log(chalk.magenta(intl.get('toolkitList')));
		printListByType('toolkit', newList);
		console.log(chalk.magenta(intl.get('pluginList')));
		printListByType('plugin', newList);
	} else {
		printListByType(type, newList);
	}
	console.log(chalk.italic.magenta('\r\n***************************************************\r\n'));
}
