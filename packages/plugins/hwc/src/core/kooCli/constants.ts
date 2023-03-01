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
import os from 'os';

export const KOOCLI_HCLOUD_PATH_KEY = '__koocli_hcloud_path_key';

// 下载地址前缀
export const KOOCLI_URL_PREFIX =
  'https://hwcloudcli.obs.cn-north-1.myhuaweicloud.com/cli/latest';

// Windows的安装路径
export const WINDOWS_KOOCLI_PATH = `${os.homedir()}\\hcloud`;

// Windows的安装包
export const WINDOWS_KOOCLI_PACKAGE = 'huaweicloud-cli-windows-amd64.zip';
