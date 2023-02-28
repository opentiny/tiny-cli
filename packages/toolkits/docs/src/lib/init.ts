/**
 * Copyright (c) 2022 - present OpentinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import * as path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { cliConfig, npm, logs, fs, user, modules } from '@opentiny/cli-devkit';
import utils from './utils';
import { techQuestion, storeQuestion, renameQuestion } from './questions';
const log = logs('@/tiny-toolkit-docs');
const cwd = process.cwd();

export default async () => {
  const prefix = cliConfig.getBinName();
  // 当前项目名称集合
  // 获取用户自定义的项目根路径名称
  const dirName = cwd.split(path.sep).pop();
  const names = utils.generateNames(dirName);
  // 套件名称 @opentiny/tiny-toolkit-docs
  const fullName = modules.utils.toolkitFullName(dirName);

  const data = {
    ...user.get(),
    ...names,
    prefix,
    // 完整的插件名称 ， 如 tiny-plugin-npm
    pluginName: fullName.replace(cliConfig.getScope(), ''),
    pluginShortName: dirName,
    pluginFullname: fullName
  };

  // 技术栈选择
  const techAnswer = await inquirer.prompt(techQuestion);
  // 选择vue技术栈模板时，询问是否修改存放示例的文件夹名称
  const storeAnswer = techAnswer?.type === 'vue' ? await inquirer.prompt(storeQuestion) : null;
  const renameAnswer = storeAnswer?.modify ? await inquirer.prompt(renameQuestion) : null;

  const from = utils.getTemplatePath(techAnswer.type);
  const to = utils.getDistPath();

  // 复制技术栈模板
  copyTemplate();

  // 修改文件夹名称选择为 yes 时，让用户输入文件夹名称
  modifydirName();

  function copyTemplate() {
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
  }

  function modifydirName() {
    if (renameAnswer) {
      const filePath = path.join(to, '/demos');
      const renamePath = path.join(to, `/${renameAnswer.dirname}`);

      fs.rename(filePath, renamePath, (err: Error) => {
        if (err) {
          log.error(err);
        }
      })

      const envFile = path.join(to, 'env/.env');
      const viteConfigFile = path.join(to, 'vite.config.js');

      utils.modifyFileContent(envFile, 'VITE_DEMOS=demos', `VITE_DEMOS=${renameAnswer.dirname}`);
      utils.modifyFileContent(viteConfigFile, "'@demos': path.resolve('demos')", `'@demos': path.resolve('${renameAnswer.dirname}')`);
    }
  }
  
  // npm 依赖安装
  log.info('正在安装 npm 依赖，安装过程需要几十秒，请耐心等待...');
  try {
    await npm.installDependencies();
  } catch (e) {
    log.error('npm 依赖安装失败');
    log.error('请手动执行 tiny i 或 npm i');
    log.debug(e);
  }
  log.success('npm 依赖安装成功');

  /* prettier-ignore-start */
  log.info(chalk.yellow('\n--------------------初始化成功,请按下面提示进行操作--------------------\n'));
  log.info(chalk.green(`${chalk.yellow(`$ ${prefix} start`)}         # 可一键开启项目开发环境`));
  log.info(chalk.green(`${chalk.yellow(`$ ${prefix} git create`)}    # 可自动在gitlab上创建仓库`));
  log.info(chalk.green(`${chalk.yellow(`$ ${prefix} help`)}          # 可查看当前套件的详细帮助`));
  log.info(chalk.green(`\n建议将现有初始化的代码提交一次到master分支, 方便后续切换到 ${chalk.yellow('daily/x.y.z')} 分支进行开发`));
  log.info(chalk.yellow('\n--------------------技术支持: @huanghaihua4@huawei.com--------------------\n'));
  /* prettier-ignore-end */
};
