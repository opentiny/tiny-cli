import inquirer from 'inquirer';
import chalk from 'chalk';
import { cliConfig as tinyStageCliConfig, logs } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  fmtDashTitle,
  getTinyProConfigure,
  ErrorUtils,
} from '../../../core';
import { EipValidator } from '../../hwc-eip/services/validate';
import { createSecurityGroups } from '../services/security-groups-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-security-groups`
);

export const commandName = '创建安全组';

async function promptSecurityGroups() {
  const nameMsg = '请输入安全组名称';
  const questions = [
    {
      type: 'input',
      name: 'securityGroupsName',
      message: `${nameMsg}（长度1-64,支持数字、字母、中文、下划线、中划线、点）`,
      replace: nameMsg,
      validate: (str: string) => {
        return EipValidator.validateName(str, '安全组名称');
      },
    },
  ];
  return inquirer.prompt(questions);
}

export const securityGroupsCreate = async () => {
  const cliConfig = getTinyProConfigure();

  console.log(
    chalk.yellow(fmtDashTitle(`开始${commandName}, 请按下面提示进行操作`))
  );

  try {
    const ans = await promptSecurityGroups();
    return createSecurityGroups(ans, cliConfig);
  } catch (err) {
    log.error(`${commandName}错误：${ErrorUtils.getErrorMessage(err)}`);
  }
};
