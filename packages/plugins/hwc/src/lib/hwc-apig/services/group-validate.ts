import { ValidatorService } from '../../../core';
import { commonMsg, apigMsg } from '../../../assets/i18n';
import { getApigGroups } from '../services/group-service';

export class ApigGroupValidators extends ValidatorService {
  public static getNameSupportCharMsg(name: string): string | void {
    // 以英文、汉字和数字开头，支持汉字、英文、数字、中划线、下划线、点、斜杠、中英文格式下的小括号和冒号、中文格式下的顿号
    if (
      !/^([a-zA-Z0-9]|[\u4e00-\u9fa5])([a-zA-Z0-9._:()（）、：\/-]|[\u4e00-\u9fa5]){2,254}$/.test(
        name
      )
    ) {
      return commonMsg.commonTermFmtErrMsg(apigMsg.groupTermName);
    }
  }

  public static getDomainSupportCharMsg(domain: string): string | void {
    if (
      !/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.){1,7}[a-zA-Z]{2,64}\.?$/.test(
        domain
      )
    ) {
      return commonMsg.commonTermFmtErrMsg(apigMsg.groupTermDomainName);
    }
  }

  public static async getRepeatDomainMsg(
    domain: string,
    instanceId: string,
    regionId: string
  ): Promise<string | void> {
    const groups = await getApigGroups(instanceId, regionId);

    for (const group of groups) {
      for (const item of group?.url_domains) {
        if (item.domain === domain) {
          return commonMsg.commonTermIsExist(
            apigMsg.groupTermDomainName,
            domain
          );
        }
      }
    }
  }

  public static async getRepeatNameMsg(
    name: string,
    instanceId: string,
    regionId: string
  ): Promise<string | void> {
    const groups = await getApigGroups(instanceId, regionId);
    for (const group of groups) {
      if (group.name === name) {
        return commonMsg.commonTermIsExist(apigMsg.groupTerm, name);
      }
    }
  }
}

export const getNameMsg = (
  name: string,
  instanceId: string,
  regionId: string
) => {
  return (
    ApigGroupValidators.getNotEmptyMsg(name, apigMsg.groupTermName) ||
    ApigGroupValidators.getLengthOutRange(name, 3, 255) ||
    ApigGroupValidators.getNameSupportCharMsg(name) ||
    ApigGroupValidators.getRepeatNameMsg(name, instanceId, regionId)
  );
};

export const getDomainMsg = (
  domain: string,
  instanceId: string,
  regionId: string
) => {
  return (
    ApigGroupValidators.getNotEmptyMsg(domain, apigMsg.groupTermDomainName) ||
    ApigGroupValidators.getLengthOutRange(domain, 1, 64) ||
    ApigGroupValidators.getDomainSupportCharMsg(domain) ||
    ApigGroupValidators.getRepeatDomainMsg(domain, instanceId, regionId)
  );
};
