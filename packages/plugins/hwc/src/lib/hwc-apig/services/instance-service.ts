import chalk from 'chalk';
import { inquirer } from '../../../core';
import { apigMsg } from '../../../assets/i18n';
import hcloudClient from '../../../core/hcloud-client';
import { ApigInstanceInfo } from '../../hwc.types';

// 查询所有实例
const getApigInstances = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud APIG ListInstancesV2
      --project_id="${cliConfig.projectId}"
      --cli-region="${cliConfig.region.id}"`
  );

  return res.instances as Array<ApigInstanceInfo>;
};

const getApigInstanceId = async (cliConfig) => {
  const instances = await getApigInstances(cliConfig);
  if (instances.length === 0) {
    return '';
  }

  let instanceId = '';
  if (instances.length === 1) {
    instanceId = instances[0].id;
  } else {
    const answer = await inquirer.prompt([
      {
        name: 'id',
        type: 'list',
        message: apigMsg.groupTermSelectInstanceMsg,
        choices: instances.map((item) => ({
          name: item.instance_name,
          value: item.id,
        })),
      },
    ]);
    instanceId = answer.id;
  }

  return instanceId;
};

export const checkApiInstanceIdExist = async (
  cliConfig,
  instanceId?: string
) => {
  let id = instanceId;

  if (!id) {
    id = await getApigInstanceId(cliConfig);
    if (!id) {
      console.log(chalk.magenta(apigMsg.groupTermBuyInstanceMsg));
      process.exit(1);
    }
  }

  return id;
};
