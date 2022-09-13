import Intl from '../intl/index';
import logs from '../log/index';
import message from './locale/index';

const log = logs('core-error');
/**
 * 未找到npm包或安装 npm 包时出现其他错误时,进行提示
 */
export default async function (e: any) {
	const errMsg = e ? e.toString() : '';
	const intl = new Intl(message);
	const regx = /install\s(.+)\serror/;
	const match = errMsg.match(regx);

	if (match) {
		log.debug('npm-not-found 捕获');
		log.error(intl.get('npmNotFound', { module: match[1] }));
		return true;
	}
	return false;
}
