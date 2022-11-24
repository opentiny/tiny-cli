import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  getHaQuestions,
  getFlavorQuestions,
  getAzsQuestions,
  getVpcQuestions,
  getFeeQuestions,
  getSubnetQuestions,
  getVolumnQuestions,
  getSecurityQuestions,
  getIsCreateSubnetQuestions,
} from '../questions';
import {
  createInstance,
  getValidFlavors,
  getValidVolumntypes,
  queryFlavors,
  queryInstances,
  querySecurityGroups,
  querySubnets,
  queryVolumnTypes,
  queryVpcs,
} from '../services/mysql-services';
import {
  getTinyProConfigure,
  CONSTANTS,
  delay,
  fmtDashTitle,
  inquirer,
  setHwcExports,
} from '../../../core';
import { createSubnet, createVpc } from '../../hwc-vpc/commands/create';
import { MysqlCreateOption } from '../../hwc.types';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-mysql`
);
const configKey = 'hwcConfig.mysql';

export const commandName = '创建数据库实例';

/**
 * 询问版本、主备
 * @param currAns
 */
async function promptHa(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();
  process.stdin.pause();
  const flavors = await queryFlavors(cliConfig);
  process.stdin.resume();

  const haQuest = getHaQuestions();
  const ans = await inquirer.prompt(haQuest, { ...currAns });
  const version: string = ans.datastore.version;
  const haMode: string = ans.ha.mode;
  ans.validFlavors = getValidFlavors(flavors, version, haMode);

  if (ans.validFlavors.length === 0) {
    log.warn(
      '\n当前的选择模式中，没有可以购买的规格，请重新选择版本和实例类型\n'
    );
    return promptHa(currAns);
  }
  return ans;
}

/**
 * 实例名称、规格
 * @param currAns
 * @param validFlavors
 */
async function promptFlavor(currAns: MysqlCreateOption) {
  const flavorQuest = getFlavorQuestions(currAns.validFlavors);
  const ans = await inquirer.prompt(flavorQuest, currAns);
  ans.currFlavor = currAns.validFlavors.find(
    (f) => f.spec_code === ans.flavor_ref
  );

  return ans;
}

/**
 * 询问磁盘类型
 * @param currAns
 * @param flavor
 */
async function promptVolumn(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();

  process.stdin.pause();
  // 根据版本和ha类型，查询所有的磁盘类型，之后与flaver做一个过滤
  const allTypes = await queryVolumnTypes(cliConfig, currAns);
  const validTypes = getValidVolumntypes(currAns.currFlavor, allTypes);
  process.stdin.resume();

  const volumnQuest = getVolumnQuestions(validTypes);

  return inquirer.prompt(volumnQuest, currAns);
}

/**
 * 询问az等
 * @param currAns
 * @param azs
 */
async function promptAzs(currAns: MysqlCreateOption) {
  const azsQuest = getAzsQuestions(currAns.currFlavor.az_info);

  return inquirer.prompt(azsQuest, currAns);
}

/**
 * 创建新vpc
 * @param ans
 */
async function useCreateVpc(currAns: any) {
  const result = await createVpc();
  const ans = { ...currAns };

  ans.vpc_id = result.vpc.id;
  ans.subnet_id = result.subnet.id;

  return ans;
}

/**
 * 询问vpc
 * @param currAns
 */
async function promptVpc(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();
  let ans: any = { ...currAns };

  process.stdin.pause();
  ans.vpcs = await queryVpcs(cliConfig);
  process.stdin.resume();

  if (ans.vpcs.length > 0) {
    const vpcQuest = getVpcQuestions(ans.vpcs);
    ans = await inquirer.prompt(vpcQuest, ans);
    // 使用现有的vpc
    if (ans.useExistVpc) {
      return ans;
    }
    return useCreateVpc(ans);
  }
  ans.useExistVpc = false;
  return useCreateVpc(ans);
}

/**
 * 询问子网
 * @param currAns
 * @param vpc
 */
async function promptSubnet(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();
  const ans: any = { ...currAns };
  const vpc = ans.vpcs.find((v) => v.id === ans.vpc_id);

  process.stdin.pause();
  const subnets = await querySubnets(cliConfig, vpc.id);
  process.stdin.resume();

  if (subnets.length === 0) {
    const isCreateQuest = getIsCreateSubnetQuestions(vpc);

    // 询问创建还是重新选择vpc
    const ans = await inquirer.prompt(isCreateQuest, currAns);
    if (ans.isCreateSubnet) {
      const subnet = await createSubnet(currAns.vpc_id, vpc.cidr);
      ans.subnet_id = subnet.id;
      return ans;
    }
    delete currAns.vpc_id;
    return promptVpc(currAns);
  }
  {
    const subnetQuest = getSubnetQuestions(subnets);
    return inquirer.prompt(subnetQuest, currAns);
  }
}

/**
 * 询问安全组
 * @param currAns
 */
async function promptSecurity(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();

  process.stdin.pause();
  const securityGroups = await querySecurityGroups(cliConfig);
  process.stdin.resume();

  const secQuest = getSecurityQuestions(securityGroups);
  return inquirer.prompt(secQuest, currAns);
}
/**
 * 询问费用
 * @param currAns
 */
async function promptFee(currAns: MysqlCreateOption) {
  const feeQuest = getFeeQuestions();

  return inquirer.prompt(feeQuest, currAns);
}

/**
 * 购买实例
 * @param currAns
 */
async function buyInstance(currAns: MysqlCreateOption) {
  const cliConfig = getTinyProConfigure();
  await createInstance(currAns, cliConfig);
}

/**
 * 同步实例配置
 */
async function syncInstances() {
  const cliConfig = getTinyProConfigure();

  await delay(1000);
  const cloudList = await queryInstances(cliConfig);
  setHwcExports(configKey, { instances: cloudList });
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

    ans = await promptHa(ans);
    ans = await promptFlavor(ans);
    ans = await promptVolumn(ans);
    ans = await promptAzs(ans);
    ans = await promptVpc(ans);
    if (ans.useExistVpc) {
      ans = await promptSubnet(ans);
    }
    ans = await promptSecurity(ans);
    ans = await promptFee(ans);

    await buyInstance(ans);
    await syncInstances();

    log.success(`${commandName}成功`);
  } catch (err) {
    log.error(`${commandName}错误：${err}`);
  }
};
