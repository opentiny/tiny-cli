import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  TINY_PRO_SUPPORT_REGION_LIST,
  fmtDashTitle,
  inquirer,
} from '../../../core';
import {
  getCreateDepQuestions,
  getDepQuestions,
  getUpdateDepQuestions,
} from '../questions';
import {
  createDepCode,
  queryDeps,
  updateDepCode,
} from '../services/fg-services';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-fg`
);

export const commandName = '创建/更新函数工作流依赖包';

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));

  const deps = await queryDeps(cliConfig);
  const depRuntime = TINY_PRO_SUPPORT_REGION_LIST.find(
    (r) => r.id === cliConfig.region.id
  ).fg.dep;
  const quest = getDepQuestions(deps);
  let ans = await inquirer.prompt(quest);

  if (ans.mode === 'create') {
    const createQuest = getCreateDepQuestions(depRuntime, deps);

    ans = await inquirer.prompt(createQuest, ans);
    await createDepCode(cliConfig, ans);
  } else {
    const selectedDep = deps.find((d) => d.id === ans.depend_id);
    const updateQuest = getUpdateDepQuestions(selectedDep, depRuntime, deps);

    ans = await inquirer.prompt(updateQuest, ans);
    await updateDepCode(cliConfig, ans, selectedDep);
  }

  log.success(`${commandName}成功`);
};
