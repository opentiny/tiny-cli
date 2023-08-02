import chalk from 'chalk';
import { cliConfig } from '@opentiny/cli-devkit';

export default function () {
  const tool = cliConfig.getBinName();
  const help = `
tiny-toolkit-pro Toolkit help info:  ${tool} [command] [option]

 $ ${tool} start                   # Start dev server
 $ ${tool} build                   # build assets
 $ ${tool} help                    # Review help info

`;
  process.stdout.write(chalk.magenta(help));
}
