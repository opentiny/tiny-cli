import { ValidatorService } from '../../../core';
import { commonMsg, vpcMsg } from '../../../assets/i18n';
import { getVpcsList } from './vpc-service';

export enum FlagType {
  VPC = 'vpc',
  SUBNET = 'subnet',
}

export class VpcValidators extends ValidatorService {
  // 仅支持数字、字母、中文、_(下划线)、-（中划线）、.（点）
  public static getSupportCharMsg(name: string): string | void {
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9-_.]*$/.test(name)) {
      return vpcMsg.vpcTermCreateBucketRulerValid;
    }
  }

  // 掩码仅支持数字
  public static getSupportDigitMsg(mask: string): string | void {
    if (!/[0-9]+/.test(mask)) {
      return vpcMsg.maskTermCreateBucketRulerValid;
    }
  }

  public static getMaskRangeMsg(
    maskStr: string,
    cidr: string,
    flag: FlagType
  ): string | void {
    const mask = parseInt(maskStr, 10);

    if (flag === FlagType.VPC) {
      const maskRange = cidr.split('/')[1].split('-');
      const min = parseInt(maskRange[0], 10);
      const max = parseInt(maskRange[1], 10);
      if (mask < min || mask > max) {
        return maskRangeMsg.get(cidr);
      }
    } else {
      const min = parseInt(cidr.split('/')[1], 10);
      // 子网掩码长度不能大于28
      if (mask < min || mask > 28) {
        return vpcMsg.subnetTermMaskMsg(min);
      }
    }
  }

  public static getNameExistMsg = async (
    name: string,
    flag: FlagType
  ): Promise<string | void> => {
    // 子网名称不需要重复性校验
    if (flag === FlagType.SUBNET) {
      return;
    }

    const vpcs = await getVpcsList();
    for (const vpc of vpcs) {
      if (vpc.name === name) {
        return commonMsg.commonTermIsExist(vpcMsg.vpcTerm, name);
      }
    }
  };
}

export const maskRangeMsg = new Map<string, string>([
  ['10.0.0.0/8-24', vpcMsg.maskRangeMsg('8-24')],
  ['172.16.0.0/12-24', vpcMsg.maskRangeMsg('12-24')],
  ['192.168.0.0/16-24', vpcMsg.maskRangeMsg('16-24')],
]);

export const getNameMsg = (name: string, flag: FlagType = FlagType.VPC) => {
  return (
    VpcValidators.getNotEmptyMsg(name, vpcMsg.vpcTermName) ||
    // 名称长度范围为1-64个字符
    VpcValidators.getLengthOutRange(name, 1, 64) ||
    VpcValidators.getSupportCharMsg(name) ||
    VpcValidators.getNameExistMsg(name, flag)
  );
};

export const getMaskMsg = (
  mask: string,
  cidr: string,
  flag: FlagType = FlagType.VPC
) => {
  return (
    VpcValidators.getNotEmptyMsg(mask, vpcMsg.maskTermName) ||
    VpcValidators.getSupportDigitMsg(mask) ||
    VpcValidators.getMaskRangeMsg(mask, cidr, flag)
  );
};
