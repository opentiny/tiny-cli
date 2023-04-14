import { fs } from '@opentiny/cli-devkit';
import utils from './utils';

// npm包名正则
const npmPackageRegex = /^(?:@([^/]+?)[/])?([^/]+?)$/;

// 调用技术栈选择
const techQuestion: Array<any> = [
  {
    type: 'list',
    name: 'tech',
    message: '请选择使用的技术栈',
    choices: [
      { name: 'vue', value: 'vue' },
      { name: 'angular', value: 'ng' },
    ],
    default: 'vue',
  },
];

// 选择示例集成方式
const integrationQuestion: Array<any> = [
  {
    type: 'list',
    name: 'integration',
    message: '请选择组件示例集成方式',
    choices: [
      { name: '本地路径', value: 'local' },
      { name: 'npm', value: 'npm' },
    ],
    default: 'local',
  },
];

const demosLocalQuestion: Array<any> = [
  {
    name: 'foldername',
    type: 'input',
    message: '请输入组件示例存放路径',
    validate: (input: string) => {
      const value = input.trim();
      const forbiddenFolder = ['src', 'tiny-uno', 'scripts', 'public', 'env'];
      const regStr = /^[a-zA-Z0-9_-]+$/;
      // 命名规范
      if (!value || !regStr.test(value)) {
        return '目录名需要是数字、字母、下划线、中划线的一种或者组合';
      }
      // 重名校验
      if (forbiddenFolder.indexOf(value) > -1) {
        return '该目录已存在，请重新输入目录';
      }
      return true;
    },
    default: 'demos',
  },
];

const demosNpmQuestion: Array<any> = [
  {
    name: 'foldername',
    type: 'input',
    message: '请输入组件示例包名',
    validate: (input: string) => {
      const value = input.trim();
      // 命名规范
      if (!value || !npmPackageRegex.test(value)) {
        return '请输入正确的包名';
      }
      return true;
    },
    default: '@opentiny/tinydoc-ng-tiny',
  },
];

const baseQuestion: Array<any> = [
  {
    name: 'base',
    type: 'input',
    message: '请输入应用访问路径',
    validate: (input: string) => {
      const value = input.trim();
      const regStr = /^[A-Za-z0-9-]+$/;
      // 命名规范
      if (!value || !regStr.test(value)) {
        return '请输入正确的路径';
      }
      return true;
    },
    default: 'tiny-ng',
  },
];

const dependencieQuestion: Array<any> = [
  {
    name: 'dependencie',
    type: 'input',
    message: '请输入组件示例依赖包名，非必填',
    validate: (input: string) => {
      const value = input.trim();
      // 命名规范
      if (value && !npmPackageRegex.test(value)) {
        return '请输入正确的包名';
      }
      return true;
    },
  },
];

export {
  techQuestion,
  integrationQuestion,
  demosLocalQuestion,
  demosNpmQuestion,
  baseQuestion,
  dependencieQuestion,
};
