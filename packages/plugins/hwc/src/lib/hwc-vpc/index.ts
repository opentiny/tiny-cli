import { addVpc, commandName as addVpcCommandName } from './commands/add';
import {
  createVpc,
  commandName as createVpcCommandName,
} from './commands/create';
import { CliOption } from '../hwc.types';
import { excuteService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '虚拟私有云 Vpc';
const commands = [addVpc, createVpc];
const commandNames = [addVpcCommandName, createVpcCommandName];

export {
  commands as vpcCommands,
  commandNames as vpcCommandNames,
  serviceName as vpcServiceName,
};

export default function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    excuteService('vpc');
  } else {
    const [cmdName] = clientArgs;
    showHelpInfo(cmdName);

    if (clientArgs[0] === 'create') {
      createVpc();
    }
    if (clientArgs[0] === 'add') {
      addVpc();
    }
  }
}
