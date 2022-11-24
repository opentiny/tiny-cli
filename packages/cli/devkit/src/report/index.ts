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
 * @desc 信息上报
 */
import axios from 'axios';
import logs from '../log/index';
import * as fs from 'fs';
import * as path from 'path';
import { getProjectEnv, getCommand, getModuleVersion } from './utils';
import git from '../git/index';
import cliConfig from '../cli-config/index';

const cwd = process.cwd();
const log = logs('core-report');
const TIMEOUT = 300;
// 在客户端中不好加密，先硬编码
const APITOKEN = '14ZOEzkrW5*s837!tA7AytKJDC5SSI9JdM!0Mb59@gOAK2';
let host = 'https://tinycommon.cloudbu.huawei.com';
if (process.env.NODE_ENV === 'local') {
	host = 'http://tinyops.dev.huawei.com:7001';
}


/**
 * 核心入口命令发送，用于统计谁做了什么操作
 */
export function baseData() {
	let branch = null;
	let repository = null;
	try {
		if (fs.existsSync(path.join(cwd, '.git'))) {
			branch = git.branch(cwd)
			repository = git.repository(cwd)
		}
	} catch (e) {
		console.error(e)
	}
	const info = getProjectEnv();
	const command = getCommand();
	return {
		userEmail: info.user.email,
		userName: info.user.name,
		cliName: info.cliName,
		cliVersion: info.cliVersion,
		system: info.system,
		npm: info.npmVersion,
		node: info.nodeVersion,
		git: repository,
		branch: branch,
		command,
		cwd,
	};
}

/**
* 上报日志
* @param {object} data
*/
export function send(type: string, data: any) {
	const url = `${host}/tinystage/api/${type}`;
	log.debug('send log for api = %s', url);
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	process.env['NODE_NO_WARNINGS'] = '1';
	axios({
		method: 'GET',	// post请求时会自动把POST请求转成GET，导致post失败，这里用get请求试试
		url,
		data,
		headers: {
			'access-token': APITOKEN
		},
		timeout: 2000,
	}).then(function () {
		log.debug('send log success');
	}).catch(function (error) {
		log.debug('send log error');
		log.debug(error);
	});
}


export function sendReportEntry() {
	const data = baseData();
	log.debug('sendReportEntry最终发送的数据 = %o', data);
	// 能获取到用户信息的话，才注入进去
	if (data.userEmail) {
		send('report-log', data);
	}
}

/**
 * 根据模块名称发送日志
 * 非入口命令发送，主要是任务流中tasks 里面的command 任务
 */
export function sendReportForModule(name: string) {
	const moduleVersion = getModuleVersion(name);
	const moduleEntry = cliConfig.getModuleEntry();
	const data: any = {
		...baseData(), moduleName: name,
		moduleVersion
	}
	// 判断如果名称一致的话，则不显示入口
	// moduleEntry 主要是标明当前命令是执行哪个命令运行起来的
	if (moduleEntry) {
		data.moduleEntry = moduleEntry;
	}
	log.debug('sendReportForModule最终发送的数据 = %o', data);
	if (data.userEmail) {
		send('report-log', data);
	}
}

export enum ErrorType {
	MODULE_NOT_FOUND = 'module-not-found',
	CLI_CORE = 'cli-core',
	CONFIG_ERROR = 'config-error',
	TASK_ERROR = 'task-error'
}

/**
 * 发生错误时，上报日志
 */
export function sendReportForError(errType: ErrorType, errDetail: any) {
	const data: any = {
		...baseData(), errType,
		errDetail
	}
	log.debug('sendReportForError最终发送的数据 = %o', data);
	if (data.userEmail) {
		send('error-log', data);
	}
}

/**
 * 禁用日志上报
 * 伏羲场景和构建场景不上报
 */
 function disableReport(){
	return true;
}
 
export default {

	ErrorType,

	/**
	 * 用户执行命令时发送记录
	 */
	entry: function () {
		// 判断是否上报日志
		if (disableReport()) return;
		setTimeout(function () {
			sendReportEntry();
		}, TIMEOUT)
	},

	/**
	 * 由tiny工具触发的命令时记录
	 * @param name tiny模块名称
	 */
	module: function (name: string) {
		// 判断是否上报日志
		if (disableReport()) return;
		setTimeout(function () {
			sendReportForModule(name);
		}, TIMEOUT)
	},
	/**
	 * 运行异常时发送日志
	 * @param errType 错误类型
	 * @param errDetail 错误详情
	 */
	error: function (errType: ErrorType, errDetail: any) {
		// 判断是否上报日志
		if (disableReport()) return;
		setTimeout(function () {
			sendReportForError(errType, errDetail);
		}, TIMEOUT)
	},
};
