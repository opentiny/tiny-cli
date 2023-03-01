import hcloudClient from '../../../core/hcloud-client';

// 查询分组列表
export const getApigGroups = async (instanceId: string, regionId: string) => {
  const res = await hcloudClient.execJson(
    // 默认只查询20条数据，此处limit设置为500最大值，显示所有分组
    `hcloud APIG ListApiGroupsV2 --instance_id="${instanceId}"
      --cli-region="${regionId}" --limit=500`
  );

  return res.groups;
};

export const createApiGroup = async (
  instanceId: string,
  regionId: string,
  groupName: string
) => {
  const result = await hcloudClient.execJson(
    `hcloud APIG CreateApiGroupV2
      --instance_id="${instanceId}"
      --cli-region="${regionId}"
      --name="${groupName}"`
  );

  return result;
};

export const associateDomain = async (
  instanceId: string,
  regionId: string,
  groupId: string,
  urlDomain: string
) => {
  const result = await hcloudClient.execJson(
    `hcloud APIG AssociateDomainV2
      --instance_id="${instanceId}"
      --cli-region="${regionId}"
      --group_id="${groupId}"
      --url_domain="${urlDomain}"`
  );

  return result;
};
