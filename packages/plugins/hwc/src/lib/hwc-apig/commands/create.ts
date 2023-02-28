import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  inquirer,
  t,
  setHwcExports,
} from '../../../core';
import { getApigGroups } from '../services/group-service';
import {
  getNameQuestions,
  getGroupQuestions,
  getProtocolQuestions,
  getFgQuestions,
  getUrlQuestions,
} from '../questions/apig-questions';
import { createApigGroups } from './group-create';
import { queryFunctions } from '../../hwc-fg/services/fg-services';
import {
  createApig as createApigService,
  getApigList,
  publishRecordForApi,
} from '../services/apig-service';
import { checkApiInstanceIdExist } from '../services/instance-service';
import createFunctionGraph from '../../hwc-fg/commands/create';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-apig`
);

export const commandName = '创建API';

// 根据用户拼写的uri, 解析出pathName变量。 比如：'/abc/{name}/{b+}' ，解析后为name,b
// 之后生成默认请求参数和后台参数
function parsePath(currAns) {
  const ans = { ...currAns };
  const url = ans.req_uri;
  const matchList = url.match(/\{[\w|\-+]*\}/g);

  if (matchList && matchList.length > 0) {
    ans.req_params = [];
    ans.backend_params = [];

    matchList.forEach((m) => {
      const name = m.slice(1, -1).replace('+', '');
      // 生成默认的请求参数
      ans.req_params.push({
        name,
        type: 'STRING',
        location: 'PATH',
      });
      // 生成默认后台参数
      ans.backend_params.push({
        name,
        location: 'PATH',
        origin: 'REQUEST',
        value: name,
      });
    });
  }

  return ans;
}

// 调用新建分组的命令
async function useCreateGroup(currAns, instanceId) {
  const group = await createApigGroups(instanceId, false);
  return {
    ...currAns,
    group_id: group.id,
  };
}

// 询问name
async function promptName(currAns, instanceId) {
  const quest = await getNameQuestions(instanceId);

  return inquirer.prompt(quest, currAns);
}

// 询问分组
async function promptGroup(currAns, instanceId) {
  const cliConfig = getTinyProConfigure();
  const groupsList = await getApigGroups(instanceId, cliConfig.region.id);
  let ans = { ...currAns };

  if (groupsList && groupsList.length > 0) {
    const quest = getGroupQuestions(groupsList);
    ans = await inquirer.prompt(quest, currAns);

    if (!ans.useExistGroup) {
      ans = await useCreateGroup(ans, instanceId);
    }
  } else {
    currAns.useExistGroup = false;
    ans = await useCreateGroup(currAns, instanceId);
  }

  return ans;
}

// 询问路径、协议、认证等等
async function promptType(currAns) {
  const quest = getProtocolQuestions();

  return inquirer.prompt(quest, currAns);
}

// 询问后端FG
async function promptFg(currAns) {
  const cliConfig = getTinyProConfigure();
  const functions = await queryFunctions(cliConfig);
  const ans = { ...currAns };

  if (functions.length === 0) {
    console.log(
      chalk.red(
        '当前 Region 下还未创建函数工作流，程序即将进入创建函数工作流步骤'
      )
    );
    const fg = await createFunctionGraph();
    ans.func_info.function_urn = fg.func_urn;
  }
  const quest = getFgQuestions(functions);
  return inquirer.prompt(quest, ans);
}

// 重复尝试创建apig
async function tryCreateApig(instanceId, currAns) {
  const cliConfig = getTinyProConfigure();

  let ans = parsePath(currAns);
  const result = await createApigService(instanceId, cliConfig, currAns);

  if (result.error_code === 'APIG.3301') {
    console.log(
      chalk.red(`请求路径 ${chalk.yellow(ans.req_uri)} 已被占用，请重新输入`)
    );
    delete ans.req_uri;
    delete ans.req_params;
    delete ans.backend_params;

    const quest = getUrlQuestions();
    ans = await inquirer.prompt(quest, ans);
    return tryCreateApig(instanceId, ans);
  }

  return result;
}

// 同步apig配置列表
async function syncApigList(instanceId) {
  const cliConfig = getTinyProConfigure();
  const apigList = await getApigList(instanceId, cliConfig.region.id);

  setHwcExports('hwcConfig.apigList', apigList);
}

export const createApig = async (instanceId?: string) => {
  const cliConfig = getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(t('apig.createTitle'))));

  // APIG操作前需要先判断用户有无专享实例
  const id = await checkApiInstanceIdExist(cliConfig, instanceId);

  try {
    // 支持函数工作流做为后端
    let ans: any = {
      backend_type: 'FUNCTION',
      func_info: {
        version: 'latest',
      },
    };

    ans = await promptGroup(ans, id);
    ans = await promptName(ans, id);
    ans = await promptType(ans);
    ans = await promptFg(ans);
    const apig = await tryCreateApig(id, ans);
    await publishRecordForApi(id, cliConfig.region.id, apig.id);
    await syncApigList(id);

    log.success(t('apig.createSuccess'));
  } catch (err) {
    log.error(t('apig.createErr', { err }));
  }
};
