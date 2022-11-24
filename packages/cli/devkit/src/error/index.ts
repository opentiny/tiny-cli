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
 * @desc 错误处理,先会调用之前注册过的错误处理,最后执行默认的处理
 */

import utils from './utils';
import logs from '../log/index';
import npmNotFound from './handle-npm-not-found';
import moduleNotFound from './handle-module-not-found';
import enoent from './handle-enoent';
import defaultError from './handle-default';

const log = logs('core-logs');
const innerList = [npmNotFound, moduleNotFound, enoent, defaultError];

/**
 * 错误处理器
 * @param {error} e 错误对象
 */
export default async function handle(e: any) {
	log.debug('error code = %s', e.code);
	log.debug(e.stack || e);
	const handList = utils.getHandleList().concat(innerList);
	// 发送错误日志

	for (let i = 0; i < handList.length; i += 1) {
		const res = await handList[i](e);
		if (res === true) {
			// 说明错误已被处理, 可以直接返回了
			return;
		}
	}
}
