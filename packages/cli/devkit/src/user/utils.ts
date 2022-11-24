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
import home from '../home/index';
import fs from 'fs-extra';
import * as path from 'path';
import logs from '../log/index';
import spawn from 'cross-spawn';
import { FILE_USER } from '../cli-config/index';

const log = logs('core-user');

export interface UserInfo {
	name: string;
	email: string;
}

/**
 * 从配置文件中获取用户信息
 */
export function getUserFromFile(): UserInfo {
	const userInfo = {
		name: '',
		email: '',
	};
	// 获取home下的tiny.user.json
	const userFile = path.join(home.getHomePath(), FILE_USER);
	if (fs.existsSync(userFile)) {
		const user = fs.readJsonSync(userFile);
		userInfo.name = user.name;
		userInfo.email = user.email;
	}
	return userInfo;
}

/**
 * 从git的配置文件中获取用户信息
 */
export function getUserFromGit(): UserInfo {
	const userInfo = {
		name: '',
		email: '',
	};

	const reg = /user\.name=([^\n]+)\nuser\.email=([^\n]+)/;
	try {
		const results = spawn.sync('git', ['config', '--list']);
		if (results.stdout) {
			const match = results.stdout.toString().match(reg);
			if (match && match.length > 1) {
				userInfo.name = match[1];
				userInfo.email = match[2];
			} else {
				const msg = 'git config --list 没有git 信息,请检查git是否正确配置了用户名和email';
				log.debug(msg);
			}
		} else {
			const msg = '没有安装git';
			log.debug(msg);
		}
	} catch (ex) {
		log.debug('tiny-user', ex);
		throw ex;
	}
	return userInfo;
}
