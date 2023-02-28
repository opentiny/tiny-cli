import addRds, { commandName as addRdsCommandName } from './commands/add';
import createRds, {
  commandName as createRdsCommandName,
} from './commands/create';
import createDBRds, {
  commandName as createDBRdsCommandName,
} from './commands/database-create';
import bindEip, { commandName as bindEipCommandName } from './commands/eip';
import { CliOption } from '../hwc.types';
import { executeService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '云数据库 RDS';
const commands = [addRds, createRds, createDBRds, bindEip];
const commandNames = [
  addRdsCommandName,
  createRdsCommandName,
  createDBRdsCommandName,
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
    await executeService('rds');
  } else {
    const cmdName = clientArgs.join('');
    const list = {
      add: addRds,
      create: createRds,
      eip: bindEip,
      databasecreate: createDBRds,
    };
    showHelpInfo(cmdName, Object.keys(list));

    list[cmdName]();
  }
}
