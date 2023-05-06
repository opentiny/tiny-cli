import {
  cliConfig as tinyStageCliConfig,
  fs,
  logs,
} from '@opentiny/cli-devkit';
import chalk from 'chalk';
import {
  getDBCfgCreateQuestions,
  getDBListQuestions,
  getPasswordAndDirQuestions,
} from '../questions';
import {
  databaseCreate,
  queryDatabaseLists,
  queryInstances,
} from '../../hwc-mysql/services';
import { databaseQuestions } from '../../hwc-mysql/questions';
import {
  CONSTANTS,
  ErrorUtils,
  fmtDashTitle,
  getTinyProConfigure,
  inquirer,
} from '../../../core';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-db-cfg-create`
);
export const commandName = '创建数据库配置信息';

// 创建函数
async function promptCreateDBCfg(cliConfig) {
  const instances = await queryInstances(cliConfig);
  const quest = getDBCfgCreateQuestions(instances);
  const instanceInfo = await inquirer.prompt(quest, {});
  const instanceId = instanceInfo.instance_info.id;
  const databaseList = await queryDatabaseLists(instanceId, cliConfig);
  let ans = {
    user: instanceInfo.instance_info.db_user_name,
    port: instanceInfo.instance_info.port,
    host: instanceInfo.instance_info.private_ips[0] || '',
  };
  if (!databaseList.length) {
    ans = await startCreateDBProcess(
      '当前数据库实例中空空如也，开始创建数据库, 请按下面提示进行操作',
      instanceId,
      cliConfig,
      ans
    );
  } else {
    const questDatabaseList = await getDBListQuestions(databaseList);
    ans = await inquirer.prompt(questDatabaseList, ans);
    if (!ans['useExistDatabase']) {
      ans = await startCreateDBProcess(
        '开始创建数据库, 请按下面提示进行操作',
        instanceId,
        cliConfig,
        ans
      );
    }
  }
  const passwordAndDir = await getPasswordAndDirQuestions();
  ans = await inquirer.prompt(passwordAndDir, ans);

  return ans;
}

export const createDBCfg = async () => {
  const cliConfig = getTinyProConfigure();
  console.log(
    chalk.yellow(fmtDashTitle(`开始${commandName}, 请按下面提示进行操作`))
  );
  const dbCfg = await promptCreateDBCfg(cliConfig);

  const dir = dbCfg['dirname'];
  delete dbCfg['dirname'];
  delete dbCfg['useExistDatabase'];
  const str = `exports.config = { db1: ${JSON.stringify(dbCfg)}, };`;
  try {
    await fs.writeFile(`${dir}/db-config.js`, str);

    log.success(`${commandName}成功`);

    return dbCfg;
  } catch (err) {
    log.error(`创建数据库配置信息失败：${ErrorUtils.getErrorMessage(err)}`);
    return {};
  }
};

async function startCreateDBProcess(
  msg: string,
  instanceId: string,
  cliConfig,
  ans
) {
  console.log(chalk.yellow(fmtDashTitle(msg)));
  const databaseQuest = await databaseQuestions();
  const databaseInfo = await inquirer.prompt(databaseQuest, {
    instance_id: instanceId,
  });
  await databaseCreate(databaseInfo, cliConfig);
  ans['database'] = databaseInfo.name;

  return ans;
}
