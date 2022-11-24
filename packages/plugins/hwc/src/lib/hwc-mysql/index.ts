import addRds, { commandName as addRdsCommandName } from './commands/add';
import createRds, {
  commandName as createRdsCommandName,
} from './commands/create';
import bindEip, { commandName as bindEipCommandName } from './commands/eip';
import { CliOption } from '../hwc.types';
import { excuteService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '云数据库 RDS';
const commands = [addRds, createRds, bindEip];
const commandNames = [
  addRdsCommandName,
  createRdsCommandName,
  bindEipCommandName,
];

export {
  commands as rdsCommands,
  commandNames as rdsCommandNames,
  serviceName as rdsServiceName,
};

export default async function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    excuteService('rds');
  } else {
    const [cmdName] = clientArgs;
    showHelpInfo(cmdName);

    if (cmdName === 'add') {
      await addRds();
    }
    if (cmdName === 'create') {
      await createRds();
    }
    if (cmdName === 'eip') {
      await bindEip();
    }
  }
}
