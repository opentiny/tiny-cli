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
 * @desc: 清除缓存
 */

import { cache, home, Intl, logs, cliConfig } from '@opentiny/cli-devkit';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';
import emoji from 'node-emoji';
import message from './locale/index';

const log = logs('core-commands');

export default async function () {
	const intl = new Intl(message);
	const cdnPath = path.join(home.getHomePath(), 'LocalCDNPath');
	const bin = cliConfig.getBinName();
	log.info(intl.get('startClear'));
	// 删除LocalCDNPath目录
	if (fs.existsSync(cdnPath)) {
		rimraf.sync(cdnPath);
	}
	cache.clear();

	const result = home.cleanHomeDir();
	if (!result.success) {
		log.error(
			`******************** ${emoji.get('warning')} ${emoji.get('warning')}  ERROR  ${emoji.get(
				'warning'
			)} ${emoji.get('warning')} **********************`
		);
		log.error(
			intl.get('clearfail', {
				tool: bin,
				removePath: result.removePath,
			})
		);
		log.error(
			`******************** ${emoji.get('warning')} ${emoji.get('warning')}  ERROR  ${emoji.get(
				'warning'
			)} ${emoji.get('warning')} **********************`
		);
	} else {
		log.success(intl.get('finishClear'));
	}
}
