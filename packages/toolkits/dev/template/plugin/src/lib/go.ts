import { logs } from '@opentiny/cli-devkit';

const log = logs('<%=pluginName%>');

/**
 * 控制台传入的参数
 */
export interface CliOption {
  clientArgs: any;
  clientOptions: any;
}

export default async function (options?: CliOption) {
  log.info('控制台输入的参数为： %o', options.clientArgs);
  log.info('控制台输入的选项为： %o', options.clientOptions);
  log.info('这是第一条插件命令');
}
