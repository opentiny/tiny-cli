import { logs, fs } from '@opentiny/cli-devkit';
import spawn from 'cross-spawn';
import * as path from 'path';
import help from './help';
import init, { CliOption } from './init';
import utils from './utils';

const log = logs('tiny-plugin-lint');
const cwd = process.cwd();

async function fix(options) {
  await checkInitEnv();

  const { clientOptions = {} } = options;
  const optsArr = [];
  Object.keys(clientOptions).forEach(key => {
    optsArr.push(`--${key}`);
    optsArr.push(clientOptions[key]);
  });
  const paramArr = ['.', '--ext', '.js,.jsx,.ts,.tsx', '--fix'].concat(optsArr);

  spawn.sync('./node_modules/eslint/bin/eslint.js', paramArr, {
    stdio: 'inherit'
  });
  log.success('fixing eslint syntax，please fix the errors/warnings');
}

async function prettier() {
  spawn.sync(
    './node_modules/.bin/prettier',
    ['--write', './**/*.{ts,tsx,css,less,scss}'],
    {
      stdio: 'inherit'
    }
  );
  log.success('prettier run scccess!');
}

async function run() {
  await checkInitEnv();
  try {
    prettier();
    spawn.sync(
      './node_modules/eslint/bin/eslint.js',
      ['.', '--ext', '.js,.jsx,.ts,.tsx'],
      { stdio: 'inherit' }
    );
    log.success('checking eslint syntax, please fix the errors/warnings');
    return 1;
  } catch {
    log.error('checking eslint error');
    return 0;
  }
}

/**
 * 注入hooks
 */
function hooks() {
  if (fs.existsSync(path.join(cwd, '.git'))) {
    // 写入pre-commit
    utils.addPreCommitHook(cwd);
    log.success(`pre-commit git钩子已注入 ${path.join(cwd, '.git/hooks')}`);
  } else {
    log.warn('当前项目下未找到.git文件夹，注入hooks失败');
  }
}

/**
 * check一下是否已经初始化过了
 */
async function checkInitEnv() {
  if (!fs.existsSync(path.join(cwd, '.eslintrc.js'))) {
    log.warn('你尚未初始化eslint 环境，请进行先初始化');
    const defaultOption: CliOption = {
      clientOptions: {},
      clientArgs: {}
    };
    await init(defaultOption);
    process.exit(1);
  }
}

function report() {
  log.success('正在生成eslint检测报告，请稍后...');
  spawn.sync(
    './node_modules/eslint/bin/eslint.js',
    [
      '.',
      '--ext',
      '.js,.jsx,.ts,.tsx',
      '-f',
      'html',
      '-o',
      'eslint-report.html'
    ],
    { stdio: 'inherit' }
  );
  log.success(`已生成eslint检测报告: ${path.join(cwd, 'eslint-report.html')}`);
}

export default {
  help,
  init,
  fix,
  run,
  prettier,
  report,
  hooks,
  default: run
};
