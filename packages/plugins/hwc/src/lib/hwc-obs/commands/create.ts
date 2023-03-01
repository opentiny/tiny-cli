import inquirer from 'inquirer';
import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  ErrorUtils,
} from '../../../core';
import { obsMsg } from '../../../assets/i18n';
import { createBucket, getBucketsList } from '../services/obs-service';
import { createObsClient } from '../obs-client';
import { getBucketNameMsg } from '../services/validate';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-obs`
);

export const commandName = '创建桶';

export const createObs = async () => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(obsMsg.obsTermBeginCreateMsg)));

  try {
    const obsClient = createObsClient(cliConfig);

    const question = [
      {
        type: 'input',
        name: 'bucketName',
        message: `${obsMsg.obsTermInputbucketName}${obsMsg.obsTermNameMsg}：`,
        validate: async (input: string) => {
          const name = input.trim();
          const errMsg = await getBucketNameMsg(obsClient, name);

          return !errMsg || errMsg;
        },
      },
    ];

    // 提示用户请输入桶名
    const { bucketName } = await inquirer.prompt(question);

    const result = await createBucket(
      obsClient,
      cliConfig.region.id,
      bucketName
    );
    if (result) {
      log.success(obsMsg.obsTermCreateSuccessMsg);

      // 更新配置文件里的桶列表
      const bucketsList = await getBucketsList(obsClient);
      setHwcExports('hwcConfig.obs', { bucketsList });
    }
  } catch (err) {
    log.error(`${obsMsg.obsTermCreateErrMsg}：${ErrorUtils.getErrorMessage(err)}`);
  }
};
