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
 * @desc 注册错误处理器
 */

import utils from './utils';
/**
 * 注册错误处理器
 * @param {generatorFunction|Array} handle 错误处理器, 必须是 generator函数, 多个时可以传数组,
 * 进程报错时传入错误对象并依次调用,
 * 如果 catch 到错误并处理完请返回 true, 否则将继续往下执行其他处理器函数
 */
export default function register(handle: any) {
	if (Array.isArray(handle)) {
		handle.forEach((item) => {
			utils.register(item);
		});
	} else {
		utils.register(handle);
	}
}
