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
  EN = 'en'
}

export interface CacheLocale {
  locale: LocaleType;
}
