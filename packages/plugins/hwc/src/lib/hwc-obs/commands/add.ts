import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
} from '../../../core';
import { obsMsg, commonMsg } from '../../../assets/i18n';
import { getBucketMetadata, getBucketsList } from '../services/obs-service';
import { createObsClient } from '../obs-client';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-obs`
);

export const commandName = '同步线上桶';
enum StorageClass {
  STANDARD = '标准存储',
  WARM = '低频访问存储',
  COLD = '归档存储',
}

export const addObs = async () => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(obsMsg.obsTermBeginAddMsg)));

  try {
    const obsClient = createObsClient(cliConfig);
    const bucketsList = await getBucketsList(obsClient);

    // 查询元数据
    const metaList = await Promise.all(
      bucketsList.map((b) => getBucketMetadata(obsClient, b.bucketName))
    );
    metaList.forEach((meta, idx) => {
      bucketsList[idx].StorageClass = StorageClass[meta.StorageClass];
      bucketsList[idx].ObsVersion = meta.ObsVersion;
      bucketsList[idx].Location = meta.Location;
    });
    if (bucketsList && bucketsList.length) {
      utils.printTable({
        columns: [
          {
            name: '序号',
            align: 'center',
            isOrder: true,
          },
          {
            name: '名称',
            dataKey: 'bucketName',
          },
          {
            name: '存储类型',
            dataKey: 'StorageClass',
          },
          {
            name: '服务版本号',
            dataKey: 'ObsVersion',
          },
          {
            name: '区域位置',
            dataKey: 'Location',
          },
        ],
        rows: bucketsList,
        colWidths: [6, 30],
      });
    } else {
      console.log(
        chalk.magenta(commonMsg.commandAddNullMsg('对象存储服务', 'obs'))
      );
    }

    setHwcExports('hwcConfig.obs', { bucketsList });
  } catch (err) {
    log.error(`${obsMsg.obsTermGetListErrMsg}：${err}`);
  }
};
