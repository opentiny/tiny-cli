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
import utils from './utils';

/**
 * 一个任务列表里面是否存在有指定时间的任务
 * @param tasks , 任务列表,与 tiny.config.js 里面任务流数据格式保持一致
 * @param when {string} 可以不传, 或传 before , after
 * @returns {boolean}
 */
function has(tasks: any, when?: string) {
	if (!tasks) {
		return false;
	}
	if (!when) {
		if (tasks.length) {
			return true;
		}
		return false;
	}
	return !!utils.classify(tasks)[when].length;
}
export default has;
