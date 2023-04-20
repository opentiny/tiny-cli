import { logs, fs, cliConfig, npm } from '@opentiny/cli-devkit';
import inquirer, { Answer } from 'inquirer';
import * as path from 'path';
// import spawn from 'cross-spawn';
import utils from './utils';

const log = logs('tiny-plugin-lint');
const cwd = process.cwd();

interface EslintOption {
  ts?: string;
  js?: string;
  vue?: string;
  vuets?: string;
  react?: string;
  angular?: string;
}
/**
 * 获取模块的类型和名称
 * @param options 模块类型
 * @return object 返回模块的类型
 */
async function getEslintType(options: EslintOption = {}): Promise<Answer> {
  let answers: Answer = { type: 'index' };
  // 如果输入了 tiny lint init --ts 这样的命令，则直接进行初始化
  if (options.ts) {
    answers.type = 'typescript';
  } else if (options.js) {
    answers.type = 'index';
  } else if (options.vue) {
    answers.type = 'vue';
  } else if (options.vuets) {
    answers.type = 'vue';
  } else if (options.react) {
    answers.type = 'index';
  } else if (options.angular) {
    answers.type = 'angular';
  } else {
    // 询问初始化哪种类型的模板
    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Please select your code style:',
        choices: [
          {
            name: 'javascript',
            value: 'index'
          },
          {
            name: 'typescript',
            value: 'typescript'
          },
          {
            name: 'angular',
            value: 'angular'
          },
          {
            name: 'angularjs',
            value: 'angularjs'
          },
          {
            name: 'vue(javascript)',
            value: 'vue'
          },
          {
            name: 'vue(typescript)',
            value: 'vue-ts'
          },
          {
            name: 'react(javascript)',
            value: 'react'
          },
          {
            name: 'react(typescript)',
            value: 'react-ts'
          }
        ]
      }
    ]);
  }
  return answers;
}
/**
 * 控制台传入的参数
 */
export interface CliOption {
  clientArgs: any;
  clientOptions: any;
}

export default async function(options?: CliOption) {
  const answers: Answer = await getEslintType(options.clientOptions);
  const from = utils.getTemplatePath();
  const to = utils.getDistPath();
  const bin = cliConfig.getBinName();
  const isNeedFormatJs =
    ['react-ts', 'vue-ts', 'typescript', 'angular'].indexOf(answers.type) ===
    -1;
  const formatJs = isNeedFormatJs ? '.js,.jsx,' : '';
  // copy 文件过去
  // tslint:disable-next-line: object-shorthand-properties-first
  fs.copyTpl(from, to, { type: answers.type, isNeedFormatJs });

  // 填充package
  const pkg = fs.readPackage() || {};
  // 是否需要格式化js

  pkg.scripts = Object.assign(pkg.scripts || {}, {
    eslint: `./node_modules/.bin/eslint . --ext ${formatJs}.ts,.tsx --fix`,
    prettier:
      './node_modules/.bin/prettier --write ./**/*.{ts,tsx,css,less,scss}',
    stylelint:
      './node_modules/.bin/stylelint ./src/**/*.scss ./src/**/*.less ./src/**/*.css --fix',
    lint: 'npm run eslint && npm run prettier && npm run stylelint'
  });
  fs.writePackage(pkg);
  // 额外包写入
  const extra = {
    typescript: [
      'typescript@~4.8.4',
      '@typescript-eslint/parser@5.52.0',
      '@typescript-eslint/eslint-plugin@5.53.0'
    ],
    react: ['eslint-plugin-react@7.18.3'],
    vue: ['vue-eslint-parser@7.3.0', 'eslint-plugin-vue@7.3.0'],
    angular: [
      '@angular-eslint/eslint-plugin',
      'typescript@~4.8.4',
      '@typescript-eslint/parser@5.52.0',
      '@typescript-eslint/eslint-plugin@5.53.0',
      'eslint-plugin-rxjs'
    ]
  };
  // 完整依赖
  const depen = [
    'eslint@^7.16.0',
    'babel-eslint@^10.1.0',
    '@opentiny/eslint-config',
    'prettier',
    'cross-spawn',
    'stylelint',
    'stylelint-config-standard'
  ].concat(extra[answers.type] || []);
  // 安装最新的eslint依赖
  await npm.install(depen, {
    // 写入 devDependencies
    'save-dev': true
  });
  // 写入pre-commit
  if (fs.existsSync(path.join(cwd, '.git'))) {
    utils.addPreCommitHook(cwd);
    log.success(`pre-commit git钩子已注入 ${path.join(cwd, '.git/hooks')}`);
  }
  log.success('eslintrc 和 prettier 运行环境已初始化!');
  log.success(`请运行 ${bin} lint fix 命令执行eslint 和 pretter`);
  log.success(`更多可用命令可通过 ${bin} lint help 查看`);
}
