import spawn from 'cross-spawn';
import { logs } from '@opentiny/cli-devkit';

const log = logs('tiny-toolkit-ng-pro');

export default function() {
  log.info('项目打包中...');
  spawn
    .sync('npm', ['run', 'build'], { stdio: 'inherit' })
    .on('close', code => {
      if (code) {
        log.error('build失败');
      }
    });
}
