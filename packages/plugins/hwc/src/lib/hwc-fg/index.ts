import addFunctionGraph, {
  commandName as addFunctionGraphCommandName,
} from './commands/add';
import createFunctionGraph, {
  commandName as createFunctionGraphCommandName,
} from './commands/create';
import updateFunctionGraph, {
  commandName as updateFunctionGraphCommandName,
} from './commands/update';
import dependencyFunctionGraph, {
  commandName as dependencyFunctionGraphCommandName,
} from './commands/dependency';
import {
  commandName as createDBCfgName,
  createDBCfg,
} from './commands/db-cfg-create';
import { CliOption } from '../hwc.types';
import { executeService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '函数工作流 FunctionGraph';
const commands = [
  addFunctionGraph,
  createFunctionGraph,
  updateFunctionGraph,
  dependencyFunctionGraph,
  createDBCfg,
];
const commandNames = [
  addFunctionGraphCommandName,
  createFunctionGraphCommandName,
  updateFunctionGraphCommandName,
  dependencyFunctionGraphCommandName,
  createDBCfgName,
];

export {
  commands as functiongraphCommands,
  commandNames as functiongraphCommandNames,
  serviceName as functionGraphServiceName,
};

export default async function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    await executeService('functiongraph');
  } else {
    const cmdName = clientArgs.join('');
    const list = {
      add: addFunctionGraph,
      create: createFunctionGraph,
      up: updateFunctionGraph,
      update: updateFunctionGraph,
      dep: dependencyFunctionGraph,
      dependency: dependencyFunctionGraph,
      'db-cfgcreate': createDBCfg,
    };
    showHelpInfo(cmdName, Object.keys(list));
    await list[cmdName]();
  }
}
