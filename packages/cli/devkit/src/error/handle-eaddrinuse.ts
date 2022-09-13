/**
 * Created by hugo on 17/4/21.
 * 端口被占用时的错误处理
 */
import logs from '../log/index';
import message from './locale/index';
import chalk from 'chalk';
import Intl from '../intl/index';
import * as os from 'os';

const log = logs('core-error');

function handleSolution(port: any) {
	const isWin = os.type().match(/^Win/);
	const intl = new Intl(message);
	if (!isWin) {
		return chalk.yellow(intl.get('winPidTips', { port }));
	}

	return chalk.yellow(intl.get('macPidTips', { port }));
}

// 处理
export default async function (e: any) {
	if (e.code !== 'EADDRINUSE') {
		return false;
	}

	const match = e.message.match(/listen EADDRINUSE(.*):(\d+)/);

	if (match && match[2]) {
		const port = match[2];
		const intl = new Intl(message);
		log.error(intl.get('helpTips', { port: chalk.green(port), solution: handleSolution(port) }));
		return true;
	}
	return false;
}
