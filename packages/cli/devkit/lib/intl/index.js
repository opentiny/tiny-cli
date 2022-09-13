"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @desc: 多语言国际化文案处理类
 * @author: 华宇果
 */
const fs_extra_1 = __importDefault(require("fs-extra"));
const intl_messageformat_1 = __importDefault(require("intl-messageformat"));
const osLocale = __importStar(require("os-locale"));
const path = __importStar(require("path"));
const index_1 = __importDefault(require("../home/index"));
const index_2 = __importDefault(require("../log/index"));
const index_3 = require("../cli-config/index");
const interfaces_1 = require("./interfaces");
const log = index_2.default('core-intl');
/**
 * 缓存的locale变量
 */
let cacheLocale;
class Intl {
    constructor(message, locale) {
        this.message = message;
        this.locale = locale || this.getLocale();
    }
    /**
     * 初始化语言文件
     */
    initLocale() {
        // 如果有全局语言文件的话，则退出
        const localeGlobal = process.env[index_3.PROCESS_ENV_LOCALE];
        if (localeGlobal)
            return;
        const localeFile = path.join(index_1.default.getHomePath(), index_3.FILE_LOCALE);
        // 初始化,获取本地电脑的语言环境
        if (!fs_extra_1.default.existsSync(localeFile)) {
            const sysLocale = osLocale.sync() || 'zh';
            const localLocale = interfaces_1.LocaleType[sysLocale.substr(0, 2)] || interfaces_1.LocaleType.ZH;
            this.setLocale(localLocale);
        }
    }
    /**
     * 获取语言信息
     * @returns 返回当前设置的多语言类型
     */
    getLocale() {
        // 如果有环境变量,则优先使用环境变量的值
        const localeGlobal = process.env[index_3.PROCESS_ENV_LOCALE];
        if (localeGlobal && interfaces_1.LocaleType[localeGlobal])
            return interfaces_1.LocaleType[localeGlobal];
        // 由于该方法调用频繁,在这里使用一个cache对象做为缓存,避免频繁的IO操作
        let localeData = { locale: interfaces_1.LocaleType.ZH };
        if (cacheLocale) {
            localeData = cacheLocale;
        }
        else {
            const localeFile = path.join(index_1.default.getHomePath(), index_3.FILE_LOCALE);
            if (fs_extra_1.default.existsSync(localeFile)) {
                localeData = fs_extra_1.default.readJsonSync(localeFile);
                cacheLocale = localeData;
            }
        }
        return localeData.locale;
    }
    /**
     * 设置语言信息
     * @param {locale} 多语言类型
     */
    setLocale(locale) {
        const localeFile = path.join(index_1.default.getHomePath(), index_3.FILE_LOCALE);
        const localeData = {
            locale,
        };
        log.debug('set aio locale data : %o', localeData);
        log.debug('set aio to : %s', localeFile);
        cacheLocale = null;
        fs_extra_1.default.outputJsonSync(localeFile, localeData);
    }
    /**
     * 获取所需的语言
     * @param key
     * @param values 语言中的变量信息
     */
    get(key, values) {
        const localeMessage = this.message[this.locale];
        let msg = !localeMessage ? this.message[interfaces_1.LocaleType.ZH][key] : localeMessage[key];
        if (msg) {
            msg = new intl_messageformat_1.default(msg, this.locale);
            return msg.format(values);
        }
        log.warn(`intl key : ${key} not defined!`);
        log.debug('message = %o', this.message);
        return '';
    }
}
exports.default = Intl;
