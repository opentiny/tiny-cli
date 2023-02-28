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
import { vpcMsg, commonMsg } from '../../../assets/i18n';
import { getVpcsList } from '../services/vpc-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-vpc`
);

export const commandName = '同步线上虚拟私有云';

export const addVpc = async () => {
  getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(vpcMsg.vpcTermBeginAddVpcMsg)));

  try {
    const vpcsList = await getVpcsList();

    if (vpcsList && vpcsList.length) {
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
            name: 'IPv4网段',
            dataKey: 'cidr',
          },
        ],
        rows: vpcsList,
        colWidths: [6, 20, 20],
      });
    } else {
      log.info(
        chalk.magenta(commonMsg.commandAddNullMsg(vpcMsg.vpcTerm, 'vpc'))
      );
    }

    setHwcExports('hwcConfig.vpc', { vpcsList });
    log.success(`${commandName}成功`);
  } catch (err) {
    log.error(`${vpcMsg.vpcTermGetVpcsListErrMsg}：${ErrorUtils.getErrorMessage(err)}`);
  }
};
