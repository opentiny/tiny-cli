/**
 * @desc: 切换语言环境
 */

import { Intl, logs } from '@opentiny/cli-devkit-core';
import inquirer, { Answer } from 'inquirer';
import message from './locale/index';

const log = logs('core-commands');

/**
 * 初始化环境
 */
export default async () => {
	let intl = new Intl(message);
	const divider = '-    ';
	const answers: Answer = await inquirer.prompt([
		{
			type: 'list',
			name: 'name',
			message: intl.get('switchLocaleTips'),
			choices: [
				{
					name: `zh    ${divider}中文`,
					value: 'zh',
				},
				{
					name: `en    ${divider}英文`,
					value: 'en',
				},
			],
		},
	]);

	// 设置env环境
	intl.setLocale(answers.name);

	intl = new Intl(message);
	log.success(intl.get('initLocalSuccess'));
};
