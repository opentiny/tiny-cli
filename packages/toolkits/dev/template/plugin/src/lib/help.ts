import chalk from 'chalk';
import { cliConfig } from '@opentiny/cli-devkit';

export default function () {
  const tool = cliConfig.getBinName();
  const help = `
<%=pluginName%> Plugin help info:  

 $ ${tool} <%= pluginShortName %> go                   # The first command
 $ ${tool} <%= pluginShortName %> help                 # Review help info
 
`;
  process.stdout.write(chalk.magenta(help));
}
