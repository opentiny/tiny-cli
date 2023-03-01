/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import hcloudClient from '../hcloud-client';

export const getDomainId = async () => {
  const result = await hcloudClient.execJson(
    'hcloud iam KeystoneListAuthDomains'
  );
  const { domains } = result;

  return domains[0].id;
};

// 查询用户输入region下的项目列表
export const getAuthProjects = async (regionId: string) => {
  const domainId = await getDomainId();
  // IAM是全局服务，此处填写默认的cn-north-4的region, 返回所有region的项目列表
  const result = await hcloudClient.execJson(
    `hcloud IAM KeystoneListAuthProjects --cli-region="cn-north-4" --cli-domain-id="${domainId}"`
  );
  const { projects } = result;
  let projectsInSelectRegion: Array<string> = [];

  if (projects.length && regionId) {
    projectsInSelectRegion = projects
      .filter((project) => project.name === regionId)
      .map((item) => item.id);
  }

  return projectsInSelectRegion;
};

export const checkAkSkIsValid = async (
  accessKeyId,
  secretAccessKey,
  regionId
) => {
  // accessKeyId, secretAccessKey, region不能从getTinyProConfigure读取，因为checkAkSkIsValid调用先于写入AK/SK
  await hcloudClient.exec(
    `hcloud IAM ListPermanentAccessKeys --cli-region=${regionId} --cli-access-key=${accessKeyId} --cli-secret-key=${secretAccessKey}`
  );
};

// accessKeyId, secretAccessKey, region不能从getTinyProConfigure读取，因为configureHcloud调用先于写入AK/SK
export const configureHcloudCli = async (
  accessKeyId,
  secretAccessKey,
  regionId
) => {
  await hcloudClient.exec(
    `hcloud configure set --cli-region=${regionId} --cli-access-key=${accessKeyId} --cli-secret-key=${secretAccessKey}`
  );
};
