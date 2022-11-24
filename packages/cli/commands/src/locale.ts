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
/**
 * @desc: 切换语言环境
 */

import { Intl, logs } from '@opentiny/cli-devkit';
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
