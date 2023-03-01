/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
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
 * @desc: 多语言国际化文案处理类
 */
import fs from 'fs-extra';
import IntlMessageFormat from 'intl-messageformat';
import * as osLocale from 'os-locale';
import * as path from 'path';
import home from '../home/index';
import logs from '../log/index';
import { FILE_LOCALE, PROCESS_ENV_LOCALE } from '../cli-config/index';
import { intlMessage, CacheLocale, LocaleType } from './interfaces';

const log = logs('core-intl');

/**
 * 缓存的locale变量
 */
let cacheLocale: CacheLocale | null;

export default class Intl {
  public message: intlMessage;
  public locale: LocaleType;
  constructor(message: intlMessage, locale?: LocaleType) {
    this.message = message;
    this.locale = locale || this.getLocale();
  }

  /**
   * 初始化语言文件
   */
  public initLocale(): void {
    // 如果有全局语言文件的话，则退出
    const localeGlobal = process.env[PROCESS_ENV_LOCALE];
    if (localeGlobal) return;

    const localeFile = path.join(home.getHomePath(), FILE_LOCALE);
    // 初始化,获取本地电脑的语言环境
    if (!fs.existsSync(localeFile)) {
      const sysLocale: string = osLocale.sync() || 'zh';
      const localLocale: LocaleType = LocaleType[sysLocale.substr(0, 2)] || LocaleType.ZH;
      this.setLocale(localLocale);
    }
  }
  /**
   * 获取语言信息
   * @returns 返回当前设置的多语言类型
   */
  public getLocale(): LocaleType {
    // 如果有环境变量,则优先使用环境变量的值
    const localeGlobal = process.env[PROCESS_ENV_LOCALE];
    if (localeGlobal && LocaleType[localeGlobal]) return LocaleType[localeGlobal];

    // 由于该方法调用频繁,在这里使用一个cache对象做为缓存,避免频繁的IO操作
    let localeData: CacheLocale = { locale: LocaleType.ZH };
    if (cacheLocale) {
      localeData = cacheLocale;
    } else {
      const localeFile = path.join(home.getHomePath(), FILE_LOCALE);
      if (fs.existsSync(localeFile)) {
        localeData = fs.readJsonSync(localeFile);
        cacheLocale = localeData;
      }
    }
    return localeData.locale;
  }

  /**
   * 设置语言信息
   * @param {locale} 多语言类型
   */
  public setLocale(locale: LocaleType): void {
    const localeFile = path.join(home.getHomePath(), FILE_LOCALE);
    const localeData = {
      locale
    };
    log.debug('set tiny locale data : %o', localeData);
    log.debug('set tiny to : %s', localeFile);
    cacheLocale = null;
    fs.outputJsonSync(localeFile, localeData);
  }

  /**
   * 获取所需的语言
   * @param key
   * @param values 语言中的变量信息
   */
  public get(key: string, values?: object): string {
    const localeMessage = this.message[this.locale];
    let msg = !localeMessage ? this.message[LocaleType.ZH][key] : localeMessage[key];

    if (msg) {
      msg = new IntlMessageFormat(msg, this.locale);
      return msg.format(values);
    }
    log.warn(`intl key : ${key} not defined!`);
    log.debug('message = %o', this.message);
    return '';
  }
}
