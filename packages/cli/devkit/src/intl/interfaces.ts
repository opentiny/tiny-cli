/**
 * 多语言文案格式
 */
export interface intlMessage {
	// 中文必须要有
	zh: object;
	// 英文可选
	en?: object;
}

/**
 * 可选的多语言文案
 */
export enum LocaleType {
	ZH = 'zh',
	EN = 'en',
}

export interface CacheLocale {
	locale: LocaleType;
}
