import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import { inquirer, CONSTANTS, getTinyProConfigure } from '../../core';
import * as commands from '../index';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-list`
);
const serviceNameKeys = Object.keys(commands).filter((key) =>
  /ServiceName$/.test(key)
);
const choices = serviceNameKeys.map((key) => commands[key]);

export const excuteService = async (serviceName: string) => {
  const questions = [
    {
      name: 'command',
      type: 'list',
      message: '请选择执行命令',
      choices: [],
    },
  ];

  questions[0].choices = commands[`${serviceName}CommandNames`];
  const ans = await inquirer.prompt(questions);

  const index = questions[0].choices.findIndex((item) => item === ans.command);

  try {
    commands[`${serviceName}Commands`][index]();
  } catch (error) {
    log.error(`系统错误，执行的命令不存在`);
  }
};

export default async function () {
  getTinyProConfigure();
  const serviceQuest = [
    {
      name: 'service',
      type: 'list',
      message: '请选择云服务',
      choices,
    },
  ];
  const ans = await inquirer.prompt(serviceQuest);

  // 获取英文的服务名，输入（对象存储服务 Obs）=>输出（obs）
  const serviceName = ans.service.split(' ')[1].toLowerCase();

  await excuteService(serviceName);
}
