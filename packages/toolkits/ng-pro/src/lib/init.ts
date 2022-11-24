import * as path from 'path';
import utils from './utils';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import { cliConfig, logs, fs, user, modules } from '@opentiny/cli-devkit';

const log = logs('tiny-toolkit-ng-pro');
const cwd = process.cwd();

export default async () => {
  const prefix = cliConfig.getBinName();
  const from = utils.getTemplatePath('root');
  const to = utils.getDistPath();

  // 当前项目名称集合
  const dirName = cwd.split(path.sep).pop();
  const names = utils.generateNames(dirName);
  const fullName = modules.utils.toolkitFullName(dirName);

  const data = {
    ...user.get(),
    ...names,
    // 完整的插件名称 ， 如 tiny-plugin-npm
    pluginName: fullName.replace('@opentiny/', ''),
    // tslint:disable-next-line
    prefix,
    pluginShortName: dirName,
    pluginFullname: fullName
  };

  fs.copyTpl(from, to, data, {
    // 改一下名称，兼容其他cli工具的情况
    rename(filename: string) {
      if (filename === 'tiny.config.js') {
        // tslint:disable-next-line: no-parameter-reassignment
        filename = `${prefix}.config.js`;
      }
      return filename;
    }
  });

  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  try {
    spawn.sync('npm', ['install'], { stdio: 'inherit' });
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error('请手动执行 aio i 或 npm i');
    log.debug(e);
  }
  log.success('npm 依赖安装成功');

  /* prettier-ignore-start */
  console.log(
    chalk.yellow(
      '\n--------------------初始化成功,请按下面提示进行操作--------------------\n'
    )
  );
  console.log(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} start`)}         # 可一键开启项目开发环境`
    )
  );
  console.log(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} help`)}          # 可查看当前套件的详细帮助`
    )
  );
  console.log(
    chalk.green(
      `\n建议将现有初始化的代码提交一次到master分支, 方便后续切换到 ${chalk.yellow(
        'daily/x.y.z'
      )} 分支进行开发`
    )
  );
  console.log(
    chalk.yellow(
      '\n--------------------技术支持: @huangye 00423248--------------------\n'
    )
  );
  /* prettier-ignore-end */
};
