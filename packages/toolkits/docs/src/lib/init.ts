import * as path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { cliConfig, npm, logs, fs } from '@opentiny/cli-devkit';
import utils from './common/utils';
import * as questions from './common/questions';

const cwd = process.cwd();
const log = logs('@/tiny-toolkit-docs');
const {
  techQuestion,
  integrationQuestion,
  demosLocalQuestion,
  demosNpmQuestion,
  baseQuestion,
  dependencieQuestion,
} = questions;

function modifyAppConfigs(demosPath) {
  if (demosPath) {
    const envFile = path.join(cwd, 'env/.env');
    const viteConfigFile = path.join(cwd, 'vite.config.js');
    const copyFile = path.join(cwd, 'scripts/copy.js');

    // 修改.env
    utils.modifyFileContent(
      envFile,
      'VITE_DEMOS=demos',
      `VITE_DEMOS=${demosPath}`
    );
    // 修改vite.config.js
    utils.modifyFileContent(
      viteConfigFile,
      "'@demos': path.resolve('demos')",
      `'@demos': path.resolve('${demosPath}')`
    );
    utils.modifyFileContent(
      viteConfigFile,
      "'@style.css': path.resolve('demos/scripts/styles.css')",
      `'@style.css': path.resolve('${demosPath}/scripts/styles.css')`
    );
    // 修改copy.js
    utils.modifyFileContent(
      copyFile,
      "source: 'demos'",
      `source: '${demosPath}'`
    );
  }
}

// package.json增加依赖
function addPackage(packageName) {
  if (packageName) {
    const pkg = fs.readPackage() || {};
    pkg.dependencies[`${packageName}`] = 'latest';
    fs.writePackage(pkg);
  }
}

async function setIntegration(integration, foldername) {
  if (foldername) {
    let name = foldername;
    if (integration === 'local') {
      const filePath = path.join(cwd, 'demos');
      const renamePath = path.join(cwd, `${name}`);

      fs.rename(filePath, renamePath, (err: Error) => {
        if (err) {
          log.error(err);
        }
      });
    } else {
      addPackage(foldername);
      name = `node_modules/${name}`;
      // 删除demos目录
      await fs.remove(path.resolve(cwd, 'demos'));
    }
    modifyAppConfigs(name);
  }
}

function setBaseConfig(base) {
  if (base) {
    const envFile = path.join(cwd, 'env/.env');
    const viteConfigFile = path.join(cwd, 'vite.config.js');

    // 修改env/.env
    utils.modifyFileContent(
      envFile,
      'VITE_CONTEXT=/tiny-ng/',
      `VITE_CONTEXT=/${base}/`
    );
    // 修改vite.config.js
    utils.modifyFileContent(
      viteConfigFile,
      "base: '/tiny-ng'",
      `base: '/${base}'`
    );
  }
}

export default async () => {
  const prefix = cliConfig.getBinName();
  const techAnswer = await inquirer.prompt(techQuestion);
  const integrationAnswer = await inquirer.prompt(integrationQuestion);
  const demosPathAnswer = await inquirer.prompt(
    integrationAnswer.integration === 'local'
      ? demosLocalQuestion
      : demosNpmQuestion
  );
  const dependencieAnswer = await inquirer.prompt(dependencieQuestion);
  const baseAnswer = await inquirer.prompt(baseQuestion);
  const from = utils.getTemplatePath(techAnswer.tech);

  // 复制技术栈模板
  fs.copyTpl(from, cwd);
  // 集成方式
  await setIntegration(
    integrationAnswer.integration,
    demosPathAnswer.foldername
  );
  // package.json增加示例依赖
  addPackage(dependencieAnswer.dependencie);
  // 设置base
  setBaseConfig(baseAnswer.base);

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
  log.info(
    chalk.yellow(
      '\n--------------------初始化成功,请按下面提示进行操作--------------------\n'
    )
  );
  log.info(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} start`)}         # 可一键开启项目开发环境`
    )
  );
  log.info(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} git create`)}    # 可自动在gitlab上创建仓库`
    )
  );
  log.info(
    chalk.green(
      `${chalk.yellow(`$ ${prefix} help`)}          # 可查看当前套件的详细帮助`
    )
  );
  log.info(
    chalk.green(
      `\n建议将现有初始化的代码提交一次到master分支, 方便后续切换到 ${chalk.yellow(
        'daily/x.y.z'
      )} 分支进行开发`
    )
  );
  log.info(
    chalk.yellow(
      '\n--------------------技术支持: @opentiny@sina.com--------------------\n'
    )
  );
  /* prettier-ignore-end */
};
