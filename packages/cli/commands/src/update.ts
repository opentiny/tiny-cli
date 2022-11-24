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
 * @desc: 更新模块
 */

import { modules, npm, Intl, logs } from '@opentiny/cli-devkit';
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
