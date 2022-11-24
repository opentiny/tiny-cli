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
 * 设置字符串边距
 * @param str
 * @param width
 * @returns {string}
 */
export function getPadding(str: string, width: number): string {
	const spaceLen = (typeof width === 'undefined' ? 30 : width) - str.length;
	let padding = '';

	padding += '  ';
	for (let i = 2; i < spaceLen; i += 1) {
		padding += '-';
	}
	padding += '  ';
	return padding;
}
