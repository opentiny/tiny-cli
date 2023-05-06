import { parse } from 'parse-gitignore';
import path from 'path';
import {
  fs,
  logs,
  cliConfig as tinyStageCliConfig,
} from '@opentiny/cli-devkit';
import { CONSTANTS, ErrorUtils } from '../../../core';
import { configureMsg } from '../../../assets/i18n';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-configure`
);

export const writeAkSkFile = (
  akSkFilePath: string,
  accessKeyId: string,
  secretAccessKey: string
) => {
  try {
    fs.ensureFileSync(akSkFilePath);
    fs.writeFileSync(
      akSkFilePath,
      JSON.stringify({ accessKeyId, secretAccessKey })
    );
  } catch (err) {
    log.error(
      `${configureMsg.cfgTermWriteAkSkError}:${ErrorUtils.getErrorMessage(err)}`
    );
  }
};

export const writeLocalHwcInfo = (akSkFilePath: string) => {
  const {
    TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER,
    TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER,
    TINY_PRO_DEFAULT_LOCAL_INFO_FILE,
  } = CONSTANTS;

  try {
    const localInfoPath = path.resolve(
      process.cwd(),
      TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER,
      TINY_PRO_DEFAULT_LOCAL_INFO_FOLDER,
      TINY_PRO_DEFAULT_LOCAL_INFO_FILE
    );

    fs.ensureFileSync(localInfoPath);
    fs.writeFileSync(
      localInfoPath,
      JSON.stringify({
        hwcConfigFilePath: akSkFilePath,
      })
    );
  } catch (err) {
    log.error(
      `${configureMsg.cfgTermWriteHwcError}:${ErrorUtils.getErrorMessage(err)}`
    );
  }
};

export const addGitIgnore = () => {
  const { TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER } = CONSTANTS;
  try {
    const gitignorePath = path.resolve(process.cwd(), '.gitignore');
    const gitignorePattern = `/${TINY_PRO_DEFAULT_CONNECT_HWC_FOLDER}`;

    fs.ensureFileSync(gitignorePath);

    const fileString = fs.readFileSync(gitignorePath, { encoding: 'utf8' });

    const { patterns } = parse(fileString);

    if (!patterns.includes(gitignorePattern)) {
      const content = fileString + gitignorePattern;

      fs.writeFileSync(gitignorePath, content);
    }
  } catch (err) {
    log.error(
      `${configureMsg.cfgTermAddGitIgnoreError}:${ErrorUtils.getErrorMessage(
        err
      )}`
    );
  }
};
