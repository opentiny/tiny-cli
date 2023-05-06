import { UNITS } from '@shared/tiny-pro';

export class LogicUtilService {
  public static getFileSize(insize: string) {
    // 运算前先转换成浮点数
    let size: number = parseFloat(insize);
    if (size) {
      let unitIndex = 0;
      let fractionDigit = 2;
      const units = [UNITS.BYTES, UNITS.KIB, UNITS.MIB, UNITS.GIB, UNITS.TIB, UNITS.PIB];
      const indexMax = units.length - 1;
      while (size >= 1024.0 && unitIndex < indexMax) {
        size = size / 1024.0;
        unitIndex++;
      }
      let unit = units[unitIndex];
      // 0或1字节改为byte
      if (unitIndex === 0) {
        fractionDigit = 0;
        if (size <= 1) {
          unit = UNITS.BYTE;
        }
      }

      return `${size.toFixed(fractionDigit)} ${unit}`;
    } else {
      return `0 ${UNITS.BYTE}`;
    }
  }
}

export class TimeUtilService {
  // 转化中国标准时间
  public static formatDate(d: Date) {
    let date = new Date(d);
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
  }
}
