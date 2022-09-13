/**
 * 多语言文案格式
 */
export interface intlMessage {
    zh: object;
    en?: object;
}
/**
 * 可选的多语言文案
 */
export declare enum LocaleType {
    ZH = "zh",
    EN = "en"
}
export interface CacheLocale {
    locale: LocaleType;
}
