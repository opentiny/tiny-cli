/**
 * @desc: 缓存模块
 * @author: 华宇果
 */

import fs from 'fs-extra';
import * as path from 'path';
import home from '../home/index';
import logs from '../log/index';
import { FILE_CACHE } from '../cli-config/index';

const log = logs('core-cache');

/**
 * 获取缓存内容,如果不存在或已过期则返回 null
 * @param {string} key 缓存的键
 * @returns {mix}
 */
export function get(key: string): any {
	// 缓存中存在，则直接返回
	// 因为这个函数调用频率很高，缓存起来比较方便
	if (process.env[key]) {
		const cacheStr = decodeURIComponent(process.env[key] || '');
		// 判断是否是字符串对象或数组
		if (cacheStr[0] === '{' || cacheStr[0] === '[') {
			return JSON.parse(decodeURIComponent(process.env[key] || ''));
		}
		return cacheStr;
	}
	const cacheFile = getCacheFile();
	log.debug('aio缓存文件的路径:', cacheFile);
	if (!key || !fs.existsSync(cacheFile)) {
		return null;
	}
	// 如果不是json文件，也不抛出异常
	let data = fs.readJsonSync(cacheFile, { throws: false }) || {};
	if (typeof data !== 'object') {
		data = {};
	}

	// 有效期判断
	if (data.__expires && data.__expires[key]) {
		if (data.__expires[key] < Date.now()) {
			return null;
		}
	}
	if (data[key]) {
		// 缓存经常获取，先存起来
		process.env[key] = encodeURIComponent(JSON.stringify(data[key]));
		return data[key];
	}

	return null;
}

export interface CacheOption {
	expires?: number | null;
}

interface CacheFile {
	__expires: object;
}

/**
 * 设置缓存内容
 * @param key {string} 缓存的键
 * @param value {mix} 缓存的值
 * @param options {object}
 * @param options.expires {number} 有效时长,毫秒为单位, 如 1分钟为 360000
 * @returns {boolean}
 */
export function set(key: string, value: any, options?: CacheOption): void {
	const cacheFile = getCacheFile();

	options = {
		expires: null,
		...options,
	};

	let data: CacheFile = { __expires: {} };
	if (fs.existsSync(cacheFile)) {
		data = fs.readJsonSync(cacheFile, { throws: false }) || {};
		if (typeof data !== 'object') {
			data = { __expires: {} };
		}
	}

	// 有效期处理
	data.__expires = data.__expires || {};
	data.__expires[key] = options.expires ? Date.now() + options.expires : null;
	data[key] = value;
	fs.outputJsonSync(cacheFile, data, { spaces: 2 });
}

/**
 * 获取缓存文件
 */
export function getCacheFile() {
	return path.resolve(home.getHomePath(), FILE_CACHE);
}

/**
 * 清除所有的缓存
 */
export function clear() {
	const cacheFile = getCacheFile();
	fs.removeSync(cacheFile);
}

export default {
	get,
	set,
	getCacheFile,
	clear,
};
