import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import chalk from 'chalk';
import {
  fmtDashTitle,
  inquirer,
  CONSTANTS,
  getTinyProConfigure,
} from '../../../core';
import { commonMsg } from '../../../assets/i18n';
import { getFuncUrnQuestions, getUploadQuestions } from '../questions';
import {
  queryDeps,
  queryFgCode,
  queryFunctions,
  updateFgCode,
} from '../services/fg-services';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-fg`
);

export const commandName = '更新函数工作流';

export default async () => {
  const cliConfig = getTinyProConfigure();

  console.log(chalk.yellow(fmtDashTitle(`开始${commandName}`)));

  const functions = await queryFunctions(cliConfig);
  const allDeps = await queryDeps(cliConfig);
  if (functions && functions.length > 0) {
    // 选择函数
    const funcQuest = getFuncUrnQuestions(functions);
    const ansFunc = await inquirer.prompt(funcQuest);
    const funcCode = await queryFgCode(cliConfig, ansFunc.func_urn);

    // 询问更新内容
    const quest = getUploadQuestions(funcCode.depend_list || [], allDeps);
    const ans = await inquirer.prompt(quest, ansFunc);

    await updateFgCode(cliConfig, ans, funcCode);
    log.success(`${commandName}成功`);
  } else {
    console.log(chalk.magenta(commonMsg.commandAddNullMsg('函数工作流', 'fg')));
  }
};
