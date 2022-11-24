import chalk from 'chalk';
import {
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  utils,
} from '../../../core';
import { commonMsg } from '../../../assets/i18n';
import { queryInstances } from '../services/mysql-services';

const configKey = 'hwcConfig.mysql';

export const commandName = '同步线上数据库实例';

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));
  // 查询云端列表
  const cloudList = await queryInstances(cliConfig);
  // 写入配置
  setHwcExports(configKey, { instances: cloudList });

  if (cloudList && cloudList.length > 0) {
    // 打印实例
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
          name: '数据库',
          dataKey: 'datastore.type',
          render: (data) => {
            return `${data.datastore.type} ${data.datastore.version}`;
          },
        },
      ],
      rows: cloudList,
      colWidths: [6, 20, 20],
    });
  } else {
    console.log(
      chalk.magenta(commonMsg.commandAddNullMsg('数据库实例', 'mysql'))
    );
  }
};
