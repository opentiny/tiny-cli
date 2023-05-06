import * as path from 'path';
import spawn from 'cross-spawn';
import { logs, fs } from '@opentiny/cli-devkit';

const log = logs('tiny-toolkit-pro');
const cwd = process.cwd();

export default function () {
  if (!fs.existsSync(path.resolve(cwd, 'node_modules'))) {
    log.info('项目中不存在 node_modules 目录, 开始自动安装项目依赖，请稍后...');
    spawn.sync('npm', ['install'], { stdio: 'inherit' });
  }

  log.info('服务开启中...');

  spawn.sync('npm', ['run', 'start'], { stdio: 'inherit' });
}
