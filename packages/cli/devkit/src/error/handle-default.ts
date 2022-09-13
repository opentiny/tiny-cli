/**
 * Created by hugo on 16/11/16.
 */

import logs from '../log/index';
import message from './locale/index';
import Intl from '../intl/index';

const log = logs('core-error');

export default async function (e: any) {
	const intl = new Intl(message);
	const ERROR_MSG = intl.get('intranetTips');
	log.error(ERROR_MSG);
	e.stack && console.log(e.stack);
	return true;
}
