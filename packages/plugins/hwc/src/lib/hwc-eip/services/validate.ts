import { ValidatorService } from '../../../core';

export class EipValidator extends ValidatorService {
  // 仅支持数字、字母、中文、_(下划线)、-（中划线）、.（点）
  public static getSupportCharMsg(name: string): string | void {
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9-_.]*$/.test(name.trim())) {
      return '只能由中文、英文字母、数字、下划线、中划线、点组成。';
    }
  }

  public static validateName(name: string, input: string): string | boolean {
    const trimName = name.trim();
    if (trimName.length === 0) {
      return true;
    }
    const errMsg =
      EipValidator.getNotEmptyMsg(trimName, input) ||
      // 名称长度范围为1-64个字符
      EipValidator.getLengthOutRange(trimName, 1, 64) ||
      EipValidator.getSupportCharMsg(trimName);

    return errMsg || true;
  }
  // 校验值：
  // 1.不允许小数
  // 2.范围校验
  // 3.小于等于300Mbit/s:默认最小单位为1Mbit/s。300Mbit/s~1000Mbit/s:默认最小单位为50Mbit/s。大于1000Mbit/s:默认最小单位为500Mbit/s
  public static validateNumRange(
    valStr: string,
    min: number,
    max: number
  ): string | boolean {
    const val = parseFloat(valStr);
    if (Math.floor(val) !== val) {
      return '请输入一个整数';
    }
    if (val < min || val > max) {
      return `请输入 ${min} - ${max} 间的数字`;
    }
    if (
      (val > 300 && val <= 1000 && val % 50 !== 0) ||
      (val > 1000 && val % 500 !== 0)
    ) {
      return `带宽小于等于300Mbit/s:默认最小单位为1Mbit/s。300Mbit/s~1000Mbit/s:默认最小单位为50Mbit/s。大于1000Mbit/s:默认最小单位为500Mbit/s`;
    }
    return true;
  }
}
