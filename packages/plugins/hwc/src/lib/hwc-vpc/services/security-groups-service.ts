import hcloudClient from '../../../core/hcloud-client';
import { SecurityGroupInfo, SecurityGroupRulesInfo } from '../../hwc.types';
import { SECURITY_GROUP_RULE_LIMIT } from '../../../core';

export const createSecurityGroups = async (ans, cliConfig) => {
  return hcloudClient.execJson(
    `hcloud VPC CreateSecurityGroup/v2 --cli-region="${cliConfig.region.id}" --security_group.name="${ans.securityGroupsName}"`
  );
};

export const getSecurityGroupId = async (cliConfig) => {
  let securityGroups = await getSecurityGroups(cliConfig);
  securityGroups = securityGroups.filter((group) => group.name === 'default');

  return securityGroups[0]['id'];
};

export const setPortToSecurityGroupRules = async (ans, cliConfig) => {
  let answer = Object.assign({}, ans);
  const securityGroupId = await getSecurityGroupId(cliConfig);
  const securityGroupRules = await getSecurityGroupRules(
    cliConfig,
    securityGroupId
  );

  // 当指定端口存在时，不做处理
  if (
    !securityGroupRules.some(
      (rules) =>
        rules.multiport &&
        rules.multiport.match(answer.port) &&
        rules.ethertype === 'IPv4'
    )
  ) {
    if (securityGroupRules.length >= SECURITY_GROUP_RULE_LIMIT) {
      answer.securityGroupRuleLimit = true;

      return answer;
    }
    answer = await createSecurityGroupRulesForRDS(
      answer,
      cliConfig,
      securityGroupId
    );
  }
  answer.securityGroupRuleLimit = false;
  answer.security_group_id = securityGroupId;

  return answer;
};

export const createSecurityGroupRulesForRDS = async (
  ans,
  cliConfig,
  securityGroupId
) => {
  ans.protocol = 'tcp';
  ans.ethertype = 'IPv4';
  ans.multiport = ans.port;
  ans.security_group_id = securityGroupId;
  ans.action = 'allow';
  ans.priority = 100;
  ans.direction = 'ingress';
  await createSecurityGroupRules(ans, cliConfig);

  return ans;
};
export const getSecurityGroupRules = async (cliConfig, securityGroupId) => {
  const securityGroupRules = await hcloudClient.execJson(
    `hcloud VPC ListSecurityGroupRules/v3 --cli-region="${cliConfig.region.id}"
    --security_group_id.1="${securityGroupId}"`
  );

  return securityGroupRules.security_group_rules as Array<SecurityGroupRulesInfo>;
};

export const getSecurityGroups = async (cliConfig) => {
  const securityGroups = await hcloudClient.execJson(
    `hcloud VPC ListSecurityGroups/v3 --cli-region="${cliConfig.region.id}"`
  );

  return securityGroups.security_groups as Array<SecurityGroupInfo>;
};

export const createSecurityGroupRules = async (ans, cliConfig) => {
  return hcloudClient.execJson(
    `hcloud VPC CreateSecurityGroupRule/v3
    --cli-region="${cliConfig.region.id}"
    --security_group_rule.protocol="${ans.protocol}"
    --security_group_rule.ethertype="${ans.ethertype}"
    --security_group_rule.multiport="${ans.multiport}"
    --security_group_rule.security_group_id="${ans.security_group_id}"
    --security_group_rule.action="${ans.action}"
    --security_group_rule.priority="${ans.priority}"
    --security_group_rule.direction="${ans.direction}"`
  );
};

export const deleteSecurityGroupRule = async (
  cliConfig,
  securityGroupRuleId
) => {
  return hcloudClient.execJson(
    `hcloud VPC DeleteSecurityGroupRule/v3
    --cli-region="${cliConfig.region.id}"
    --security_group_rule_id="${securityGroupRuleId}"`
  );
};
