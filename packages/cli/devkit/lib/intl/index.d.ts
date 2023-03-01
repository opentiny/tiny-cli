import { intlMessage, LocaleType } from './interfaces';
export default class Intl {
    message: intlMessage;
    locale: LocaleType;
    constructor(message: intlMessage, locale?: LocaleType);
    /**
     * 初始化语言文件
     */
    initLocale(): void;
    /**
     * 获取语言信息
     * @returns 返回当前设置的多语言类型
     */
    getLocale(): LocaleType;
    /**
     * 设置语言信息
     * @param {locale} 多语言类型
     */
    setLocale(locale: LocaleType): void;
    /**
     * 获取所需的语言
     * @param key
     * @param values 语言中的变量信息
     */
    get(key: string, values?: object): string;
}
