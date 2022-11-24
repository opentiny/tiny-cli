import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import chalk from 'chalk';
import {
  CONSTANTS,
  TINY_PRO_SUPPORT_REGION_LIST,
  getTinyProConfigure,
  fmtDashTitle,
  inquirer,
  setHwcExports,
} from '../../../core';
import { getCreateQuestions, getCreateRuntimeQuestions } from '../questions';
import { createFg, queryFunctions } from '../services/fg-services';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-fg`
);
const configKey = 'hwcConfig.functiongraph';

export const commandName = '创建函数工作流';

// 创建函数
async function promptCreateFg(cliConfig, fgRuntime) {
  const quest = await getCreateQuestions(fgRuntime);
  let ans = await inquirer.prompt(quest, {});

  const runtimeQuest = getCreateRuntimeQuestions(fgRuntime, ans);
  ans = await inquirer.prompt(runtimeQuest, ans);
  return createFg(cliConfig, ans);
}
// 同步最新的fg列表
async function syncFg(cliConfig) {
  const functions = await queryFunctions(cliConfig);

  setHwcExports(configKey, { functions });
}

export default async () => {
  const cliConfig = getTinyProConfigure();
  const fgRuntime = TINY_PRO_SUPPORT_REGION_LIST.find(
    (r) => r.id === cliConfig.region.id
  ).fg;

  console.log(
    chalk.yellow(fmtDashTitle(`开始${commandName}, 请按下面提示进行操作`))
  );
  const fg = await promptCreateFg(cliConfig, fgRuntime);
  await syncFg(cliConfig);
  log.success(`${commandName}成功`);

  return fg;
};
