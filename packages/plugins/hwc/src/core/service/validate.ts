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
