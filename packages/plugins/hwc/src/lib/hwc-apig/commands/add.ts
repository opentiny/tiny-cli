import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
  ErrorUtils,
} from '../../../core';
import { apigMsg, commonMsg } from '../../../assets/i18n';
import { getApigList } from '../services/apig-service';
import { checkApiInstanceIdExist } from '../services/instance-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-apig`
);

export const commandName = '同步线上API列表';

export const addApig = async (instanceId?: string) => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(apigMsg.apigTermBeginAddApigMsg)));

  // APIG操作前需要先判断用户有无专享实例
  const id = await checkApiInstanceIdExist(cliConfig, instanceId);

  try {
    const apigList = await getApigList(id, cliConfig.region.id);

    if (apigList && apigList.length) {
      utils.printTable({
        columns: [
          {
            name: '序号',
            align: 'center',
            isOrder: true,
          },
          {
            name: '名称',
            dataKey: 'name',
          },
          {
            name: '请求方法',
            dataKey: 'req_method',
          },
          {
            name: '路径',
            dataKey: 'req_uri',
          },
          {
            name: '所属分组',
            dataKey: 'group_name',
          },
        ],
        rows: apigList,
        colWidths: [6, 20, 10, 20, 20],
      });
    } else {
      console.log(
        chalk.magenta(commonMsg.commandAddNullMsg('API列表', 'apig'))
      );
    }

    setHwcExports('hwcConfig.apigList', apigList);
  } catch (err) {
    log.error(
      `${apigMsg.apigTermGetApigListErrMsg}：${ErrorUtils.getErrorMessage(err)}`
    );
  }
};
