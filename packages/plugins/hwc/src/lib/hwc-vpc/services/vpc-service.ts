import hcloudClient from '../../../core/hcloud-client';
import { VpcInfo } from '../../hwc.types';

export const createVpcService = async (vpcName: string, cidr: string) => {
  const result = await hcloudClient.execJson(
    `hcloud VPC CreateVpc/v2 --vpc.name="${vpcName}" --vpc.cidr="${cidr}"`
  );

  return result.vpc as VpcInfo;
};

export const getVpcsList = async () => {
  const res = await hcloudClient.execJson('hcloud vpc ListVpcs/v3');

  return res.vpcs as Array<VpcInfo>;
};
