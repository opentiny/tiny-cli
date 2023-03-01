import chalk from 'chalk';
import { cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import { CONSTANTS } from '../core';

export default function () {
  const binName = tinyStageCliConfig.getBinName();
  const { TINY_PRO_DEFAULT_BIN, TINY_PRO_DEFAULT_HWC_EXPORTS } = CONSTANTS;

  const help = `
  ${tinyStageCliConfig.DEFAULT_BIN}-plugin-${TINY_PRO_DEFAULT_BIN} Plugin help info:

 $ ${binName} ${TINY_PRO_DEFAULT_BIN}                                     # 菜单式功能向导，推荐使用
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} help                                # 显示此帮助
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} configure                           # 初始化插件的配置信息
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} fg <add | create | update | dep | db-cfg create>    # 管理函数工作流 Function Graph
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} mysql <add | create | database create | eip>          # 管理云数据库 RDS
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} obs <add | create>                  # 管理对象存储服务 Obs
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} vpc <add | create>      # 管理虚拟私有云 Vpc
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} eip <add | create>                  # 管理弹性公网IP Eip
 $ ${binName} ${TINY_PRO_DEFAULT_BIN} apig <add | create | group add | group create>         # 管理API网关 APIG

 `;
  const tip = `
 提示：
   第一次使用，请首先调用初始化配置信息命令，后续使用华为云服务命令时，将根据配置中的AK/SK/Region信息进行获取。
   管理华为云的相关命令，会将华为云信息保存至 ${TINY_PRO_DEFAULT_HWC_EXPORTS} 文件中。

`;
  process.stdout.write(chalk.hex('#3a96dd')(help));
  process.stdout.write(chalk.yellow(tip));
}
