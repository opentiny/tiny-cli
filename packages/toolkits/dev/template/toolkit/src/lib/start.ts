import fs from 'fs';
import * as path from 'path';
import spawn from 'cross-spawn';
import open from 'open';
import { config, logs } from '@opentiny/cli-devkit';

const log = logs('<%=pluginName%>');
const cwd = process.cwd();

export default function () {

  const toolkitConfig = config.get('toolkitConfig');

  if (!fs.existsSync(path.resolve(cwd, 'webpack.config.js'))) {
    log.error('未发现 webpack.config.js 文件');
    return;
  }

  spawn('./node_modules/.bin/webpack-dev-server', [
    '--config',
    './webpack.config.js',
    '--port',
    toolkitConfig.port
  ], { stdio: 'inherit' });

  if (toolkitConfig.open) {
    // 开服务器比较慢,给它留点时间buffer
    setTimeout(() => {
      open(`http://127.0.0.1:${toolkitConfig.port}/${toolkitConfig.openTarget}`);
    }, 500);
  }
};
