import path from 'path';
import {
  logs,
  fs,
  cliConfig as tinyStageCliConfig,
} from '@opentiny/cli-devkit';
import { CONSTANTS } from './constants';
import { Region } from './region-list';
import { getHwcExports } from '../service/common';
import { configureMsg } from '../../assets/i18n';

const {
  TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER,
  TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER,
  TINY_PRO_DEFAULT_LOCAL_INFO_FILE,
  TINY_PRO_DEFAULT_BIN,
  TINY_PRO_DEFAULT_HWC_EXPORTS,
} = CONSTANTS;

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${TINY_PRO_DEFAULT_BIN}`
);

export interface ITinyProConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: Region;
  projectId?: string;
}

const getAkSkInfo = () => {
  const config: ITinyProConfig = {} as ITinyProConfig;
  const localInfoPath = path.resolve(
    process.cwd(),
    TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER,
    TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER,
    TINY_PRO_DEFAULT_LOCAL_INFO_FILE
  );

  try {
    const path = fs.readFileSync(localInfoPath, { encoding: 'utf8' });
    const { hwcConfigFilePath } = path && JSON.parse(path);
    fs.ensureFileSync(hwcConfigFilePath);

    const fileString = fs.readFileSync(hwcConfigFilePath, { encoding: 'utf8' });
    const { accessKeyId, secretAccessKey } = JSON.parse(fileString);
    config.accessKeyId = accessKeyId;
    config.secretAccessKey = secretAccessKey;

    return config;
  } catch (error) {
    log.error(configureMsg.cfgTermGetError('AK/SK'));
    process.exit(1);
  }
};

// 获取公共配置的方法，调用getTinyProConfigure()方法
export const getTinyProConfigure = () => {
  const cliConfig = { ...getAkSkInfo(), region: { id: '' } };
  const tinyConfig = getHwcExports('hwcConfig');

  if (!tinyConfig) {
    log.error(configureMsg.cfgTermGetError(configureMsg.cfgTermInfo));
    process.exit(1);
  }

  if (tinyConfig.regionId) {
    cliConfig.region.id = tinyConfig.regionId;
  } else {
    log.error(configureMsg.cfgTermGetError('Region'));
    process.exit(1);
  }

  if (tinyConfig.projectId) {
    cliConfig.projectId = tinyConfig.projectId;
  } else {
    log.error(configureMsg.cfgTermGetError(configureMsg.cfgTermProjectId));
    process.exit(1);
  }
  return cliConfig;
};

export const getHwcExportsPath = () => {
  return path.resolve(process.cwd(), TINY_PRO_DEFAULT_HWC_EXPORTS);
};

export * from './constants';
export * from './region-list';
