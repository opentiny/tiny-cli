/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
// to use V8's code cache to speed up instantiation time
require('v8-compile-cache');
process.removeAllListeners('warning');
import { cliConfig } from '@opentiny/cli-devkit';
import * as path from 'path';
import * as fs from 'fs';
const sudoBlock = require('sudo-block');
const pkg = require('../package.json');
const {
  PROCESS_ENV_CLI_PACKAGE,
  PROCESS_ENV_CLI_VERSION,
  PROCESS_ENV_BIN,
  PROCESS_ENV_CONFIG_FILE,
  DEFAULT_CONFIG_FILE,
  PROCESS_ENV_HOME_FOLDE,
  DEFAULT_BIN,
  DEFAULT_HOME_FOLDER,
} = cliConfig;

// 禁止 sudo 执行 tiny 命令
sudoBlock();

const cliEnv = [
  {
    key: PROCESS_ENV_CLI_PACKAGE,
    value: pkg.name,
  },
  {
    key: PROCESS_ENV_CLI_VERSION,
    value: pkg.version,
  },
  {
    key: PROCESS_ENV_BIN,
    value: DEFAULT_BIN,
  },
  {
    key: PROCESS_ENV_CONFIG_FILE,
    value: DEFAULT_CONFIG_FILE,
  },
  {
    key: PROCESS_ENV_HOME_FOLDE,
    value: DEFAULT_HOME_FOLDER,
  },
];

/**
 * 初始化开发环境
 * 需要在require其他包之前先进行初始化
 * @param obj
 */
function initConfig(envs: any) {
  envs.forEach((item) => {
    if (!process.env[item.key]) {
      process.env[item.key] = item.value;
    }
  });
}

// 运行前的一些初始化配置工作，这些内容将存于tiny的运行时
initConfig(cliEnv);

// Check if we need to profile this CLI run.
if (process.env['TINY_CLI_PROFILING']) {
  let profiler: {
    startProfiling: (name?: string, recsamples?: boolean) => void;
    stopProfiling: (name?: string) => any; // tslint:disable-line:no-any
  };
  try {
    profiler = require('v8-profiler-node8'); // tslint:disable-line:no-implicit-dependencies
  } catch (err) {
    throw new Error(
      `Could not require 'v8-profiler-node8'. You must install it separetely with ` +
        `'npm install v8-profiler-node8 --no-save'.\n\nOriginal error:\n\n${err}`
    );
  }

  profiler.startProfiling();

  const exitHandler = (options: { cleanup?: boolean; exit?: boolean }) => {
    if (options.cleanup) {
      const cpuProfile = profiler.stopProfiling();
      fs.writeFileSync(
        path.resolve(process.cwd(), process.env['TINY_CLI_PROFILING'] || '') + '.cpuprofile',
        JSON.stringify(cpuProfile)
      );
    }

    if (options.exit) {
      process.exit();
    }
  };

  process.on('exit', () => exitHandler({ cleanup: true }));
  process.on('SIGINT', () => exitHandler({ exit: true }));
  process.on('uncaughtException', () => exitHandler({ exit: true }));
}
