import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  inquirer,
  ErrorUtils,
} from '../../../core';
import { apigMsg, commonMsg } from '../../../assets/i18n';
import { getApigList, publishRecordForApi } from '../services/apig-service';
import { checkApiInstanceIdExist } from '../services/instance-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-apig`
);

export const commandName = '发布API';

export const publishApig = async (instanceId?: string) => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(apigMsg.apigTermBeginPublishMsg)));

  // APIG操作前需要先判断用户有无专享实例
  const id = await checkApiInstanceIdExist(cliConfig, instanceId);

  try {
    const apigList = await getApigList(id, cliConfig.region.id);

    if (apigList && apigList.length) {
      const listQuestion = [
        {
          type: 'table',
          name: 'apiName',
          message: apigMsg.apigTermSelectPublishMsg,
          colWidths: [10, 20, 20],
          valueKey: 'name',
          columns: [
            {
              name: '序号',
              align: 'center',
              isOrder: true,
            },
            {
              name: apigMsg.apigTermName,
              dataKey: 'name',
            },
            {
              name: apigMsg.apigTermRequestPath,
              dataKey: 'req_uri',
            },
          ],
          rows: apigList,
        },
      ];

      const { apiName } = await inquirer.prompt(listQuestion);
      const apiId = apigList.find((api) => api.name === apiName).id;

      const result = await publishRecordForApi(id, cliConfig.region.id, apiId);

      if (result) {
        log.success(apigMsg.apigTermPublishSuccessMsg(apiName));
      }
    } else {
      log.info(chalk.magenta(commonMsg.commandAddNullMsg('API列表', 'apig')));
    }
  } catch (err) {
    log.error(
      `${apigMsg.apigTermPublishErrMsg}：${ErrorUtils.getErrorMessage(err)}`
    );
  }
};
