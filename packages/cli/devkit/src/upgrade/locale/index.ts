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
export default {
	zh: {
		updateTips: '升级提示',
		recommendVersion: '推荐的版本是 {latest} , 本地版本是 {localVersion}, 建议升级后再使用,保证功能的稳定性',
		recommendedVersion: '推荐的版本是 {latest} , 本地版本是 {localVersion}, 为保证功能的稳定性，需进行更新',
		updateCommand: '请执行 {icon}  {command} 来升级',
		updatingCommand: '系统正在执行 {icon}  {command} 自动升级',
		ifUpdateError: '如果提示没有权限，请尝试',
	},
	en: {
		updateTips: 'Upgrade tips',
		recommendVersion:
			'Recommended version is {latest}, the local version is {localVersion}, it is recommended to upgrade and then use',
		recommendedVersion:
			'Recommended version is {latest}, the local version is {localVersion}, and the system will be updated automatically to ensure the stability',
		updateCommand: 'Please use {icon} {command} to upgrade',
		updatingCommand: 'The system is performing {icon} {command} automatic upgrade',
		ifUpdateError: "If the prompt shows that you don't have permission, please try",
	},
};
