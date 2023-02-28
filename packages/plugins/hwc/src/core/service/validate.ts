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
import { commonMsg } from '../../assets/i18n';

export class ValidatorService {
  // 此项不能为空
  public static getNotEmptyMsg(name: string, input: string): string | void {
    if (!name) {
      return commonMsg.commonTermEmptyWarnMsg(input);
    }
  }

  // 长度范围为min-max个字符
  public static getLengthOutRange(
    name: string,
    min: number,
    max: number
  ): string | void {
    if (name.length < min || name.length > max) {
      return commonMsg.commonTermLengthWarnMsg(min, max);
    }
  }
}
