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
import debug from 'debug';
import * as path from 'path';
import { createLogger, format, transports } from 'winston';
import home from '../home/index';
import * as process from 'process';
const { combine, timestamp, colorize } = format;

/**
 * 格式化额外信息
 * @param {*} meta
 * @returns
 */
const formatMeta = (meta) => {
	// You can format the splat yourself
	const splat = meta[Symbol.for('splat')];
	let msg = '';
	if (splat && splat.length) {
		try {
			msg = splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
		} catch (e) {
			console.error(e);
		}
	}
	return msg;
};

const formatMessage = format.printf((info) => {
	const { level, message, label, timestamp, stack, ...metadata } = info;
	let output = message;
	// @ts-ignore
	if (message instanceof Error) {
		output = message.stack || message;
	} else if (typeof message === 'object') {
		output = JSON.stringify(message);
	}
	if (stack) {
		output += '\n' + stack;
	}
	return `${timestamp} [${label}]: ${output} ${formatMeta(metadata)}`;
});
// 单例化logger对象，各文件间共享
let _logger;
function loggerSingleton() {
	if (_logger) {
		return _logger;
	} else {
		// 定义一个全局变量用于改变log存放位置，也方便测试使用。
		const homePath = process.env.TINY_LOG_PATH || path.join(home.getHomePath(), 'log');
		_logger = createLogger({
			level: 'verbose',
			format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), formatMessage),
			transports: [
				// console输出加个颜色
				new transports.Console({
					format: combine(colorize({ all: true, colors: { info: 'magenta', verbose: 'green' } })),
				}),
				// warn/error level的打印到文件
				new transports.File({
					filename: path.join(homePath, `${new Date().toISOString().split('T')[0]}.log`),
					level: 'warn',
				}),
			],
		});
		return _logger;
	}
}

interface ILogger {
	info(...args: any[]): void;
	success(...args: any[]): void;
	warn(...args: any[]): void;
	error(...args: any[]): void;
	debug(...args: any[]): void;
}

/**
 * 基于winston输出日志
 * @param label: 标签，一般用于定位该日志是哪个模块输出的
 */
export default (label: string): ILogger => {
	return (function () {
		const methodLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
		const wLogger: any = {};
		methodLevels.forEach((level) => {
			wLogger[level] = function () {
				const args = [...arguments];
				const message = args.length === 1 ? args[0] : args;
				// debug模式下继续使用debug包在命令行输出
				if (level === 'debug') {
					return debug(label).apply(null, args);
				}
				loggerSingleton().log({
					level,
					label,
					message,
				});
			};
		});
		// 兼容原有success方法输出
		wLogger.success = wLogger.verbose;
		return wLogger;
	})();
};
