import chalk from 'chalk';
import { getTinyProConfigure, showHelpInfo } from '../../core';
import { apigMsg } from '../../assets/i18n';
import {
  addApigGroups,
  commandName as addApigGroupsCommandName,
} from './commands/group-add';
import {
  createApigGroups,
  commandName as createApigGroupsCommandName,
} from './commands/group-create';
import { addApig, commandName as addApigCommandName } from './commands/add';
import {
  createApig,
  commandName as createApigCommandName,
} from './commands/create';
import {
  publishApig,
  commandName as publishApigCommandName,
} from './commands/publish';
import { CliOption } from '../hwc.types';
import { excuteService } from '../list';
import { checkApiInstanceIdExist } from './services/instance-service';

const serviceName = 'API网关 APIG';
const commands = [
  addApigGroups,
  createApigGroups,
  addApig,
  createApig,
  publishApig,
];
const commandNames = [
  addApigGroupsCommandName,
  createApigGroupsCommandName,
  addApigCommandName,
  createApigCommandName,
  publishApigCommandName,
];

const operateApig = (instanceId: string, options?: CliOption) => {
  const { clientArgs } = options;
  if (clientArgs.length !== 1) {
    return;
  }

  if (clientArgs[0] === 'create') {
    createApig(instanceId);
  }
  if (clientArgs[0] === 'add') {
    addApig(instanceId);
  }
  if (clientArgs[0] === 'publish') {
    publishApig(instanceId);
  }
};

const operateApigGroup = async (instanceId: string, options?: CliOption) => {
  const { clientArgs } = options;
  if (clientArgs.length !== 2) {
    return;
  }

  if (clientArgs[0] === 'group') {
    showHelpInfo(clientArgs[1]);

    if (clientArgs[1] === 'add') {
      addApigGroups(instanceId);
    }
    if (clientArgs[1] === 'create') {
      await createApigGroups(instanceId);
    }
  }
};

export {
  commands as apigCommands,
  commandNames as apigCommandNames,
  serviceName as apigServiceName,
};

export default async function (options?: CliOption) {
  const cliConfig = getTinyProConfigure();

  // APIG操作前需要先判断用户有无专享实例
  const instanceId = await checkApiInstanceIdExist(cliConfig);
  if (!instanceId) {
    console.log(chalk.magenta(apigMsg.groupTermBuyInstanceMsg));
    process.exit(1);
  }

  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    excuteService('apig');
  } else {
    const [cmdName] = clientArgs;
    const availableCmds = ['add', 'create', 'group'];
    showHelpInfo(cmdName, availableCmds);

    operateApig(instanceId, options);
    operateApigGroup(instanceId, options);
  }
}
