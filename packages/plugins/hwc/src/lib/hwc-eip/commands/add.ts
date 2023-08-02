import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  utils,
  CONSTANTS,
  fmtDashTitle,
  setHwcExports,
  getTinyProConfigure,
  ErrorUtils,
} from '../../../core';
import { queryEipList } from '../services/eip-services';
import { commonMsg } from '../../../assets/i18n';

export const commandName = '同步弹性公网IP';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-eip`
);

export const addEip = async () => {
  getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));

  try {
    const { publicips } = await queryEipList();

    if (publicips && publicips.length > 0) {
      utils.printTable({
        columns: [
          {
            name: '序号',
            align: 'center',
            isOrder: true,
          },
          {
            name: '名称',
            dataKey: 'alias',
          },
          {
            name: '弹性公网IP地址',
            dataKey: 'public_ip_address',
          },
          {
            name: '带宽名称',
            dataKey: 'bandwidth_name',
          },
          {
            name: '带宽大小',
            dataKey: 'bandwidth_size',
            render: (data) => {
              return `${data.bandwidth_size} Mbit/s`;
            },
          },
        ],
        rows: publicips,
        colWidths: [6, 20, 20, 20, 15],
      });
    } else {
      log.info(chalk.magenta(commonMsg.commandAddNullMsg('弹性公网IP', 'eip')));
    }
    setHwcExports('hwcConfig.eipList', { publicips });
    log.success(`${commandName}成功`);
  } catch (err) {
    log.error(`${commandName}失败：${ErrorUtils.getErrorMessage(err)}`);
  }
};
