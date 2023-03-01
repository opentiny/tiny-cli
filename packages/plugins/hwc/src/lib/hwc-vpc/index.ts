import { addVpc, commandName as addVpcCommandName } from './commands/add';
import {
  createVpc,
  commandName as createVpcCommandName,
} from './commands/create';
import {
  securityGroupsCreate,
  commandName as securityGroupsCreateCommandName,
} from './commands/security-groups-create';
import { CliOption } from '../hwc.types';
import { executeService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '虚拟私有云 Vpc';
const commands = [addVpc, createVpc, securityGroupsCreate];
const commandNames = [
  addVpcCommandName,
  createVpcCommandName,
  securityGroupsCreateCommandName,
];

export {
  commands as vpcCommands,
  commandNames as vpcCommandNames,
  serviceName as vpcServiceName,
};

export default function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    executeService('vpc');
  } else {
    const cmdName = clientArgs.join('');
    showHelpInfo(cmdName, ['add', 'create', 'security-groupscreate']);
    const list = {
      add: addVpc,
      create: createVpc,
      'security-groupscreate': securityGroupsCreate,
    };
    list[cmdName]();
  }
}
