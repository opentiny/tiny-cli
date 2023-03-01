import chalk from 'chalk';
import random from 'string-random';
import path from 'path';
import {
  cliConfig as tinyStageCliConfig,
  home,
  logs,
} from '@opentiny/cli-devkit';
import {
  checkAkSkIsValid,
  configureHcloudCli,
  CONSTANTS,
  fmtDashTitle,
  getAuthProjects,
  inquirer,
  isHwcExportsExists,
  setHwcExports,
  TINY_PRO_SUPPORT_REGION_LIST,
  ErrorUtils,
} from '../../../core';
import { configureMsg } from '../../../assets/i18n';
import {
  addGitIgnore,
  writeAkSkFile,
  writeLocalHwcInfo,
} from '../services/configure';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-configure`
);

const getReCfgPrompt = async () => {
  const question = [
    {
      type: 'confirm',
      name: 'isReCfg',
      message: configureMsg.cfgTermReCfgMsg,
    },
  ];

  const { isReCfg } = await inquirer.prompt(question);

  return isReCfg;
};

const selectProjectIdPrompt = async (regionId: string) => {
  const projectIdList = await getAuthProjects(regionId);

  // 如果获取到的projectId列表为空，提醒用户输入
  if (!projectIdList.length) {
    const inputQuestion = [
      {
        type: 'input',
        name: 'projectId',
        message: configureMsg.cfgTermInputProjectIdMsg,
      },
    ];

    const { projectId } = await inquirer.prompt(inputQuestion);
    setHwcExports('hwcConfig.projectId', projectId);

    return;
  }

  const listQuestion = [
    {
      type: 'list',
      name: 'projectId',
      message: configureMsg.cfgTermSelectProjectIdMsg,
      choices: projectIdList,
    },
  ];

  const { projectId } = await inquirer.prompt(listQuestion);
  setHwcExports('hwcConfig.projectId', projectId);
};

const getAkSkRegionPrompt = async () => {
  const questions = [
    {
      type: 'input',
      name: 'accessKeyId',
      message: configureMsg.cfgTermInputAkMsg,
    },
    {
      type: 'password',
      mask: ' ',
      name: 'secretAccessKey',
      message: configureMsg.cfgTermInputSkMsg,
    },
    {
      type: 'table',
      name: 'regionId',
      message: configureMsg.cfgTermSelectRegion,
      colWidths: [10, 20, 20],
      valueKey: 'id',
      displayAnswer: (data) => `${data.name}(${data.id})`,
      columns: [
        {
          name: '序号',
          align: 'center',
          isOrder: true,
        },
        {
          name: 'region',
          dataKey: 'id',
        },
        {
          name: configureMsg.cfgTermName,
          dataKey: 'name',
        },
      ],
      rows: TINY_PRO_SUPPORT_REGION_LIST,
    },
  ];

  return inquirer.prompt(questions);
};

export const configure = async () => {
  // 根据配置文件是否存在判断用户是否需要重新配置
  if (isHwcExportsExists()) {
    const isReCfg = await getReCfgPrompt();
    if (!isReCfg) {
      return;
    }
  }

  console.log(chalk.yellow(fmtDashTitle(configureMsg.cfgTermBeginMsg)));
  const { TINY_PRO_DEFAULT_HOME_FOLDER } = CONSTANTS;
  const { accessKeyId, secretAccessKey, regionId } =
    await getAkSkRegionPrompt();

  await checkAkSkIsValid(accessKeyId, secretAccessKey, regionId);
  await configureHcloudCli(accessKeyId, secretAccessKey, regionId);

  const akSkFileName = random(10);
  const akSkFilePath = path.resolve(
    home.getHomePath(),
    TINY_PRO_DEFAULT_HOME_FOLDER,
    akSkFileName
  );

  try {
    writeAkSkFile(akSkFilePath, accessKeyId, secretAccessKey);
    writeLocalHwcInfo(akSkFilePath);
    addGitIgnore();

    setHwcExports('hwcConfig.regionId', regionId);

    await selectProjectIdPrompt(regionId);

    log.success(configureMsg.cfgTermResultSuccessMsg);
  } catch (err) {
    log.error(`${configureMsg.cfgTermResultErrMsg}：${ErrorUtils.getErrorMessage(err)}`);
  }
};
