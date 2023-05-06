import chalk from 'chalk';
import {
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
  CONSTANTS,
  ErrorUtils,
} from '../../../core';
import { commonMsg } from '../../../assets/i18n';
import { queryFunctions } from '../services/fg-services';
import { cliConfig as tinyStageCliConfig, logs } from '@opentiny/cli-devkit';

export const commandName = '同步线上函数工作流';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-fg`
);

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));
  try {
    const functions = await queryFunctions(cliConfig);

    if (functions && functions.length > 0) {
      // 打印函数
      utils.printTable({
        columns: [
          {
            name: '序号',
            align: 'center',
            isOrder: true,
          },
          {
            name: '名称',
            dataKey: 'func_name',
          },
          {
            name: '运行时',
            dataKey: 'runtime',
          },
        ],
        rows: functions,
        colWidths: [6, 20, 15],
      });
    } else {
      log.info(chalk.magenta(commonMsg.commandAddNullMsg('函数工作流', 'fg')));
    }
    setHwcExports('hwcConfig.functiongraph', { functions });
    log.success(`${commandName}成功`);
  } catch (err) {
    log.error(`${commandName}失败：${ErrorUtils.getErrorMessage(err)}`);
  }
};
