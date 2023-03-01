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
import { HcClient } from '@huaweicloud/huaweicloud-sdk-core/HcClient';
import {
  ClientOptions,
  DefaultHttpClient,
} from '@huaweicloud/huaweicloud-sdk-core/http/DefaultHttpClient';
import { BasicCredentials, Region } from '@huaweicloud/huaweicloud-sdk-core';
import { getTinyProConfigure } from '../config';

/**
 * 用于API方式访问华为云服务
 * @param endpoint  以https:// 开始的服务的终结点，
 * @returns HcClient
 */
function createClient(endpoint: string) {
  const config = getTinyProConfigure();

  const axiosOptions: ClientOptions = {
    disableSslVerification: true,
    proxy: process.env.HTTP_PROXY || process.env.HTTPS_PROXY,
  };
  const basicCredentials = new BasicCredentials({
    ak: config.accessKeyId,
    sk: config.secretAccessKey,
    projectId: config.projectId,
  });
  // 每次创建一个client
  const hcClient = new HcClient(new DefaultHttpClient(axiosOptions))
    .withCredential(basicCredentials)
    .withRegion(new Region(config.region.id, endpoint));

  return hcClient;
}

export default createClient;
