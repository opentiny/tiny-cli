import os from 'os';
// TODO: 替换掉 github actions 的包
import * as tc from '@actions/tool-cache';
import {
  logs,
  fs,
  cliConfig as tinyStageCliConfig,
} from '@opentiny/cli-devkit';
import { CONSTANTS } from '../config/constants';
import {
  KOOCLI_URL_PREFIX,
  WINDOWS_KOOCLI_PATH,
  WINDOWS_KOOCLI_PACKAGE,
} from './constants';
import hcloudClient from '../hcloud-client';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-kooCli`
);

/**
 * 获取 cli package 完整下载路径
 * @param packageName
 * @returns
 */
function getDownloadUrl(packageName: string): string {
  return packageName ? `${KOOCLI_URL_PREFIX}/${packageName}` : '';
}

/**
 * 针对不同操作系统完成 KooCLI 安装
 * @param platform
 */
async function installKooCLIByPlatform(platform: string) {
  switch (platform) {
    case 'win32':
      await installCLLIOnWindows();
      break;
    // no default
  }
}

/**
 * 在 windows 系统上安装 KooCLI
 */
async function installCLLIOnWindows() {
  const isHcloudExisted = await fs.exists(`${WINDOWS_KOOCLI_PATH}/hcloud.exe`);

  if (!isHcloudExisted) {
    try {
      await fs.ensureDir(`${WINDOWS_KOOCLI_PATH}`);
      // 使用代理时出现 self signed certificate 问题， 暂时修改 process.env.NODE_TLS_REJECT_UNAUTHORIZED
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const downloadUrl = getDownloadUrl(WINDOWS_KOOCLI_PACKAGE);
      const zip = `${WINDOWS_KOOCLI_PATH}/hcloud.zip`;
      const cliPath = await tc.downloadTool(downloadUrl, zip);

      await tc.extractZip(cliPath, WINDOWS_KOOCLI_PATH);
    } catch (error) {
      log.error('KooCLI安装失败');
      process.exit(1);
    }
  }
}

function checkNetworkConnection() {
  // 调用ListApiVersion接口测试网络连通性, 该接口不需要配置信息
  return hcloudClient.exec(
    'hcloud VPC ListApiVersion/v2 --cli-region="cn-north-1"'
  );
}

/**
 * 检查系统上是否安装了 KooCLI，如果没有，会尝试进行安装，如果安装不成功，则提示安装失败，结束操作
 */
export async function installCLIOnSystem() {
  const platform = os.platform();

  await Promise.all([
    installKooCLIByPlatform(platform),
    checkNetworkConnection(),
  ]);

  // 为当前进程添加hcloud的环境变量
  process.env.Path += `;${WINDOWS_KOOCLI_PATH}`;
}
