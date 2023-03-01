import { ValidatorService } from '../../../core';
import { commonMsg, obsMsg } from '../../../assets/i18n';
import { isBucketExist } from './obs-service';

export class BucketNameValidators extends ValidatorService {
  // 仅支持小写字母、数字、中划线（-）、英文句号（.）
  public static getSupportCharMsg(name: string): string | void {
    if (!/^[a-z0-9-.]+$/.test(name)) {
      return obsMsg.obsTermCreateBucketRuler1Valid;
    }
  }

  // 禁止使用IP地址
  public static getNotIpMsg(name: string): string | void {
    if (
      /^(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))$/i.test(
        name
      ) ||
      /^(((([\da-f]{1,4}):){7}([\da-f]{1,4}))|(((([\da-f]{1,4}):){1,7}:)|((([\da-f]{1,4}):){6}:([\da-f]{1,4}))|((([\da-f]{1,4}):){5}:(([\da-f]{1,4}):)?([\da-f]{1,4}))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):){0,2}([\da-f]{1,4}))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,3}([\da-f]{1,4}))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,4}([\da-f]{1,4}))|((([\da-f]{1,4}):){1}:(([\da-f]{1,4}):){0,5}([\da-f]{1,4}))|(::(([\da-f]{1,4}):){0,6}([\da-f]{1,4}))|(::([\da-f]{1,4})?))|(((([\da-f]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-f]{1,4})::(([\da-f]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-f]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/i.test(
        name
      )
    ) {
      return obsMsg.obsTermCreateBucketRuler2Valid;
    }
  }

  // 禁止以中划线（-）或英文句号（.）开头及结尾
  public static getStartEndMsg(name: string): string | void {
    if (/^[-|.]/.test(name) || /[-|.]$/.test(name)) {
      return obsMsg.obsTermCreateBucketRuler3Valid;
    }
  }

  // 禁止两个英文句号（.）相邻（如"my..bucket"）
  public static getTwoDotsMsg(name: string): string | void {
    if (/\.\./.test(name)) {
      return obsMsg.obsTermCreateBucketRuler4Valid;
    }
  }

  // 禁止中划线（-）和英文句号（.）相邻（如"my-.bucket"和"my.-bucket"）
  public static getLineDotMsg(name: string): string | void {
    if (name.includes('-.') || name.includes('.-')) {
      return obsMsg.obsTermCreateBucketRuler5Valid;
    }
  }

  // 判断桶名称是否重复
  public static getBucketExistMsg = async (
    obsClient: any,
    bucketName: string
  ): Promise<string | void> => {
    const isExit = await isBucketExist(obsClient, bucketName);

    if (isExit) {
      return commonMsg.commonTermIsExist(obsMsg.obsTermBucket, bucketName);
    }
  };
}

export const getBucketNameMsg = (obsClient: unknown, name: string) => {
  return (
    BucketNameValidators.getNotEmptyMsg(name, obsMsg.obsTermName) ||
    // 长度范围为3到63个字符
    BucketNameValidators.getLengthOutRange(name, 3, 63) ||
    BucketNameValidators.getSupportCharMsg(name) ||
    BucketNameValidators.getNotIpMsg(name) ||
    BucketNameValidators.getStartEndMsg(name) ||
    BucketNameValidators.getTwoDotsMsg(name) ||
    BucketNameValidators.getLineDotMsg(name) ||
    BucketNameValidators.getBucketExistMsg(obsClient, name)
  );
};
