import chalk from 'chalk';
import { cliConfig as tinyStageCliConfig, logs } from '@opentiny/cli-devkit';
import { databaseCreate, queryInstances } from '../services/mysql-services';
import {
  CONSTANTS,
  fmtDashTitle,
  getTinyProConfigure,
  inquirer,
  ErrorUtils,
} from '../../../core';
import { getMysqlInstancesQuestions } from '../questions';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-mysql`
);

export const commandName = '创建数据库';

async function promptInstances(currAns) {
  const cliConfig = getTinyProConfigure();
  const instances = await queryInstances(cliConfig);
  const quest = getMysqlInstancesQuestions(instances);
  return inquirer.prompt(quest, currAns);
}

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(
    chalk.yellow(fmtDashTitle(`开始${commandName}, 请按下面提示进行操作`))
  );

  try {
    let ans: any = {
      datastore: { type: 'MySQL' },
      region: cliConfig.region.id,
      charge_info: { is_auto_pay: true },
    };

    ans = await promptInstances(ans);
    await databaseCreate(ans, cliConfig);

    log.success(`${commandName}成功`);
  } catch (err) {
    log.error(`${commandName}错误：${ErrorUtils.getErrorMessage(err)}`);
  }
};
