/**
 * @desc 错误处理,先会调用之前注册过的错误处理,最后执行默认的处理
 */

import utils from './utils';
import logs from '../log/index';
import report, { ErrorType } from '../report/index';
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
	report.error(e.code || ErrorType.CLI_CORE, e.stack || e);

	for (let i = 0; i < handList.length; i += 1) {
		const res = await handList[i](e);
		if (res === true) {
			// 说明错误已被处理, 可以直接返回了
			return;
		}
	}
}
