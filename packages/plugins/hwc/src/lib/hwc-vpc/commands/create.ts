import inquirer from 'inquirer';
import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  CONSTANTS,
  getTinyProConfigure,
  fmtDashTitle,
  setHwcExports,
} from '../../../core';
import { vpcMsg } from '../../../assets/i18n';
import { SubnetInfo } from '../../hwc.types';
import { createVpcService, getVpcsList } from '../services/vpc-service';
import { createSubnetService } from '../services/subnet-service';
import {
  getNameMsg,
  getMaskMsg,
  maskRangeMsg,
  FlagType,
} from '../services/validate';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-vpc`
);

export const commandName = '创建虚拟私有云';

const getCidr = (cidrRange: string, mask: string) => {
  const cidrIp = cidrRange.split('/');
  return `${cidrIp[0]}/${mask}`;
};

const getSubnetNamePrompt = async () => {
  const nameQuestion = [
    {
      type: 'input',
      name: 'subnetName',
      message: `${vpcMsg.subnetTermNameInputMsg}${vpcMsg.subnetTermNameRule}:`,
      validate: async (input: string) => {
        const name = input.trim();
        const errMsg = await getNameMsg(name, FlagType.SUBNET);

        return !errMsg || errMsg;
      },
    },
  ];

  const { subnetName } = await inquirer.prompt(nameQuestion);

  return subnetName;
};

const getSubnetCidr = async (vpcCidr: string) => {
  const subnetMaskMin = vpcCidr.split('/')[1];
  const subnetMaskQuestion = [
    {
      type: 'input',
      name: 'subnetMask',
      message: vpcMsg.subnetTermMaskMsg(subnetMaskMin),
      validate: (input: string) => {
        const mask = input.trim();
        const errMsg = getMaskMsg(mask, vpcCidr, FlagType.SUBNET);

        return !errMsg || errMsg;
      },
    },
  ];

  const { subnetMask } = await inquirer.prompt(subnetMaskQuestion);
  const subnetCidr = getCidr(vpcCidr, subnetMask);

  return subnetCidr;
};

const getVpcNameCidrPrompt = async () => {
  const nameCidrQuestions = [
    {
      type: 'input',
      name: 'vpcName',
      message: `${vpcMsg.vpcTermNameInputMsg}${vpcMsg.vpcTermNameRule}:`,
      validate: async (input: string) => {
        const name = input.trim();
        const errMsg = await getNameMsg(name);

        return !errMsg || errMsg;
      },
    },
    {
      type: 'list',
      name: 'cidrRange',
      message: vpcMsg.vpcTermNameCidrMsg,
      choices: [...maskRangeMsg.keys()],
    },
  ];

  const { vpcName, cidrRange } = await inquirer.prompt(nameCidrQuestions);

  return { vpcName, cidrRange };
};

const getVpcCidrPrompt = async (cidrRange: string) => {
  const cidrRangeMsg = maskRangeMsg.get(cidrRange);
  const maskQuestion = [
    {
      type: 'input',
      name: 'mask',
      message: vpcMsg.vpcTermMaskMsg(cidrRangeMsg),
      validate: (input: string) => {
        const mask = input.trim();
        const errMsg = getMaskMsg(mask, cidrRange);

        return !errMsg || errMsg;
      },
    },
  ];

  const { mask } = await inquirer.prompt(maskQuestion);
  const vpcCidr = getCidr(cidrRange, mask);

  return vpcCidr;
};

export const createSubnet = async (vpcId: string, vpcCidr: string) => {
  const subnetName = await getSubnetNamePrompt();
  const subnetCidr = await getSubnetCidr(vpcCidr);
  const subnet = await createSubnetService(subnetName, vpcId, subnetCidr);

  log.success(vpcMsg.subnetTermCreateVpcSuccessMsg);

  return subnet as SubnetInfo;
};

export const createVpc = async () => {
  getTinyProConfigure();
  console.log(chalk.yellow(fmtDashTitle(vpcMsg.vpcTermBeginCreateVpcMsg)));

  const { vpcName, cidrRange } = await getVpcNameCidrPrompt();
  const vpcCidr = await getVpcCidrPrompt(cidrRange);
  const vpc = await createVpcService(vpcName, vpcCidr);

  log.success(vpcMsg.vpcTermCreateVpcSuccessMsg);

  const subnet = await createSubnet(vpc.id, vpcCidr);
  const vpcsList = await getVpcsList();

  setHwcExports('hwcConfig.vpc', { vpcsList });

  return { vpc, subnet };
};
