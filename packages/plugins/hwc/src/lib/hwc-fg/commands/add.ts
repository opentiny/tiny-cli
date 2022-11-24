import chalk from 'chalk';
import {
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
} from '../../../core';
import { commonMsg } from '../../../assets/i18n';
import { queryFunctions } from '../services/fg-services';

const configKey = 'hwcConfig.functiongraph';

export const commandName = '同步线上函数工作流';

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));

  const functions = await queryFunctions(cliConfig);
  setHwcExports(configKey, {
    functions,
  });

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
    console.log(chalk.magenta(commonMsg.commandAddNullMsg('函数工作流', 'fg')));
  }
};
