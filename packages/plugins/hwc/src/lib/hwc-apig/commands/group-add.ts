import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
} from '../../../core';
import { apigMsg, commonMsg } from '../../../assets/i18n';
import { getApigGroups } from '../services/group-service';
import { checkApiInstanceIdExist } from '../services/instance-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-apig`
);

export const commandName = '同步线上API分组';

export const addApigGroups = async (instanceId?: string) => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(apigMsg.groupTermBeginAddApigMsg)));

  // APIG操作前需要先判断用户有无专享实例
  const id = await checkApiInstanceIdExist(cliConfig, instanceId);

  try {
    const groupsList = await getApigGroups(id, cliConfig.region.id);

    if (groupsList && groupsList.length) {
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
        ],
        rows: groupsList,
        colWidths: [6, 30],
      });
    } else {
      console.log(
        chalk.magenta(
          commonMsg.commandAddNullMsg('API网关分组列表', 'apig group')
        )
      );
    }

    // config.set第一个键值只能设置两个，暂时解决方案为分开apigGroupsList和apigList
    setHwcExports('hwcConfig.apigGroupsList', groupsList);
  } catch (err) {
    log.error(`${apigMsg.groupTermGetGroupListErrMsg}：${err}`);
  }
};
