import inquirer from 'inquirer';
import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
  ErrorUtils,
} from '../../../core';
import { apigMsg } from '../../../assets/i18n';
import {
  createApiGroup,
  getApigGroups,
  associateDomain,
} from '../services/group-service';
import { getNameMsg, getDomainMsg } from '../services/group-validate';
import { checkApiInstanceIdExist } from '../services/instance-service';
import { ApigGroupInfo } from '../../hwc.types';
import { createCorsApig, publishRecordForApi } from '../services/apig-service';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-apig`
);

export const commandName = '创建API分组';

const groupCreatePrompt = async (instanceId: string, regionId: string) => {
  const question = [
    {
      type: 'input',
      name: 'groupName',
      message: `${apigMsg.groupTermInputGroupName}${apigMsg.groupTermNameMsg}：`,
      validate: async (input: string) => {
        const name = input.trim();
        const errMsg = await getNameMsg(name, instanceId, regionId);

        return !errMsg || errMsg;
      },
    },
  ];

  const { groupName } = await inquirer.prompt(question);

  const result = await createApiGroup(instanceId, regionId, groupName);

  if (result && result.id && result.sl_domain) {
    // 自动创建一个options的apig
    const cliConfig = getTinyProConfigure();
    const corsApig = await createCorsApig(instanceId, cliConfig, result.id);

    if (corsApig && corsApig.id) {
      await publishRecordForApi(instanceId, regionId, corsApig.id);
    }

    log.success(apigMsg.groupTermCreateSuccessMsg);

    const groupsList = await getApigGroups(instanceId, regionId);
    setHwcExports('hwcConfig.apigGroupsList', groupsList);

    return result as ApigGroupInfo;
  }

  return null;
};

const getDomainQuestions = (instanceId: string, regionId: string) => {
  const questions = [
    {
      type: 'confirm',
      name: 'isBindDomain',
      message: apigMsg.groupTermBindDomainName,
    },
    {
      type: 'input',
      name: 'urlDomain',
      message: `${apigMsg.groupTermInputDomainName}${apigMsg.groupTermDomainNameMsg}：`,
      validate: async (input: string) => {
        const domain = input.trim();
        const errMsg = await getDomainMsg(domain, instanceId, regionId);

        return !errMsg || errMsg;
      },
      replace: apigMsg.groupTermInputDomainName,
      when: (answers) => answers.isBindDomain === true,
    },
  ];

  return questions;
};

const bindDomainNamePrompt = async (
  instanceId: string,
  regionId: string,
  groupId: string,
  groupName: string,
  slDomain: string
) => {
  console.log(
    chalk.magenta(apigMsg.groupTermBindDomainMsg(groupName, slDomain))
  );

  const domainQuestions = getDomainQuestions(instanceId, regionId);
  const { urlDomain } = await inquirer.prompt(domainQuestions);

  if (urlDomain) {
    try {
      const result = await associateDomain(
        instanceId,
        regionId,
        groupId,
        urlDomain
      );

      if (result) {
        log.success(apigMsg.groupTermBindDomainSuccessMsg(urlDomain));
      }
    } catch (error) {
      log.error(`${apigMsg.groupTermBindDomainNameErrMsg}：${error}`);
    }
  }
};

export const createApigGroups = async (
  instanceId?: string,
  isExit: boolean = true
) => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(apigMsg.groupTermBeginCreateApigMsg)));

  // APIG操作前需要先判断用户有无专享实例
  const id = await checkApiInstanceIdExist(cliConfig, instanceId);

  try {
    const result = await groupCreatePrompt(id, cliConfig.region.id);

    if (result && result.id && result.sl_domain) {
      await bindDomainNamePrompt(
        id,
        cliConfig.region.id,
        result.id,
        result.name,
        result.sl_domain
      );
    }

    // 创建APIG分组命令是否退出，在创建APIG的时候调用不需要退出
    if (isExit) {
      process.exit();
    }

    return result;
  } catch (err) {
    log.error(`${apigMsg.groupTermCreateErrMsg}：${ErrorUtils.getErrorMessage(err)}`);

    return null;
  }
};
