import fs from 'fs';
import * as path from 'path';
import spawn from 'cross-spawn';
import { logs } from '@opentiny/cli-devkit';
import { CliOption } from './interfaces';

const log = logs('<%=pluginName%>');
const cwd = process.cwd();

export default function (options?: CliOption) {
  log.info('控制台输入的参数为： %o', options.clientArgs);
  log.info('控制台输入的选项为： %o', options.clientOptions);

  if (!fs.existsSync(path.resolve(cwd, 'webpack.config.js'))) {
    log.error('未发现 webpack.config.js 文件');
    return;
  }

  log.info('项目打包中...');
  const cli = spawn(
    './node_modules/.bin/webpack',
    ['--config', './webpack.config.js'],
    { stdio: 'inherit' }
  );

  cli.on('close', (status) => {
    if (status === 0) {
      log.success('打包完成');
    } else {
      log.error('打包失败', status);
    }
  });
}
