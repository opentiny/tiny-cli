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
