import chalk from 'chalk';
import { cliConfig } from '@opentiny/cli-devkit';

export default function () {
  const tool = cliConfig.getBinName();
  const help = `
tiny-plugin-lint Plugin help info:  

 $ ${tool} lint                      # 执行eslint，自动修复部分错误
 $ ${tool} lint init                 # 初始化 eslint 和 pretter 运行环境
 $ ${tool} lint fix                  # 执行eslint，自动修复部分错误
 $ ${tool} lint hooks                # 添加pre-commit hooks到项目中
 $ ${tool} lint report               # 输出eslint报告
 $ ${tool} lint help                 # Review help info
 
`;
  process.stdout.write(chalk.magenta(help));
}
