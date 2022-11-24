import hcloudClient from '../../../core/hcloud-client';
import { SubnetInfo } from '../../hwc.types';

// 查询指定vpc_id下的子网列表
export const getSubnetsList = async (vpcId: string) => {
  const res = await hcloudClient.execJson(
    `hcloud VPC ListSubnets --vpc_id="${vpcId}"`
  );

  return res.subnets as Array<SubnetInfo>;
};

export const createSubnetService = async (
  subnetName: string,
  vpcId: string,
  cidr: string
) => {
  const subnetData = cidr.split('.');
  let gateWayIp = '';
  // 此处传最后一位默认为1作为网关IP
  if (subnetData.length === 4) {
    gateWayIp = `${subnetData[0]}.${subnetData[1]}.${subnetData[2]}.1`;
  }

  const result = await hcloudClient.execJson(
    `hcloud VPC CreateSubnet --subnet.name="${subnetName}" --subnet.vpc_id="${vpcId}" --subnet.cidr="${cidr}" --subnet.gateway_ip="${gateWayIp}"`
  );
  return result.subnet as SubnetInfo;
};
