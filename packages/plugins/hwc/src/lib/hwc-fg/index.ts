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
import { CliOption } from '../hwc.types';
import { excuteService } from '../list';
import { showHelpInfo } from '../../core';

const serviceName = '函数工作流 FunctionGraph';
const commands = [
  addFunctionGraph,
  createFunctionGraph,
  updateFunctionGraph,
  dependencyFunctionGraph,
];
const commandNames = [
  addFunctionGraphCommandName,
  createFunctionGraphCommandName,
  updateFunctionGraphCommandName,
  dependencyFunctionGraphCommandName,
];

export {
  commands as functiongraphCommands,
  commandNames as functiongraphCommandNames,
  serviceName as functionGraphServiceName,
};

export default async function (options?: CliOption) {
  const { clientArgs } = options;

  if (clientArgs.length === 0) {
    excuteService('functiongraph');
  } else {
    const cmd = options.clientArgs[0];

    const [cmdName] = clientArgs;
    const availableCmds = [
      'add',
      'create',
      'up',
      'update',
      'dep',
      'dependency',
    ];
    showHelpInfo(cmdName, availableCmds);

    if (cmd === 'add') {
      await addFunctionGraph();
    }
    if (cmd === 'create') {
      await createFunctionGraph();
    }
    if (cmd === 'up' || cmd === 'update') {
      await updateFunctionGraph();
    }
    if (cmd === 'dep' || cmd === 'dependency') {
      await dependencyFunctionGraph();
    }
  }
}
