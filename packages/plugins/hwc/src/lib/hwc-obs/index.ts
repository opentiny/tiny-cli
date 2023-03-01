import {
  createObs,
  commandName as createObsCommandName,
} from './commands/create';
import { addObs, commandName as addObsCommandName } from './commands/add';
import { CliOption } from '../hwc.types';
import { executeService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '对象存储服务 Obs';
const commands = [createObs, addObs];
const commandNames = [createObsCommandName, addObsCommandName];

export {
  commands as obsCommands,
  commandNames as obsCommandNames,
  serviceName as obsServiceName,
};

export default function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    executeService('obs');
  } else {
    const [cmdName] = clientArgs;
    showHelpInfo(cmdName);

    if (cmdName === 'create') {
      createObs();
    }

    if (cmdName === 'add') {
      addObs();
    }
  }
}
