import { addEip, commandName as addEipCommandName } from './commands/add';
import {
  createEip,
  commandName as createEipCommandName,
} from './commands/create';
import { CliOption } from '../hwc.types';
import { executeService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '弹性公网IP Eip';
const commands = [addEip, createEip];
const commandNames = [addEipCommandName, createEipCommandName];

export {
  commands as eipCommands,
  commandNames as eipCommandNames,
  serviceName as eipServiceName,
};

export default async function (options: CliOption) {
  const { clientArgs = [] } = options;
  if (clientArgs.length === 0) {
    executeService('eip');
  } else {
    const [cmdName] = clientArgs;
    showHelpInfo(cmdName);

    if (cmdName === 'create') {
      await createEip();
    } else if (cmdName === 'add') {
      await addEip();
    }
  }
}
