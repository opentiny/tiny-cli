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
 * @desc 根据用户当前 git 信息去获取用户相关信息
 */

import fs from 'fs-extra';
import * as path from 'path';
import * as utils from './utils';
import home from '../home/index';
import { FILE_USER } from '../cli-config/index';
import { UserInfo } from './interface';

/**
 * 获取当前电脑用户
 */
export function get(): UserInfo {
	let userInfo = utils.getUserFromFile();
	if (!userInfo.email) {
		userInfo = utils.getUserFromGit();
		// 获取之后再写入进去
		if (userInfo.name && userInfo.email) {
			const userFile = path.join(home.getHomePath(), FILE_USER);
			fs.outputJsonSync(userFile, userInfo, { spaces: 2 });
		}
	}
	return userInfo;
}

/**
 * 写入user缓存
 * @param data 需要写入用户信息字段的数据
 */
export function set(data: any) {
	// 获取home下的tiny.user.json
	const userFile = path.join(home.getHomePath(), FILE_USER);
	if (fs.existsSync(userFile)) {
		const user = fs.readJsonSync(userFile);
		const userInfo = Object.assign(user, data);
		fs.outputJsonSync(userFile, userInfo, { spaces: 2 });
	}
}

export default {
	get,
	set,
};
