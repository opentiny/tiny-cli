import path from 'path';
import { fs } from '@opentiny/cli-devkit';
import { DependencyInfo, FunctionGraphInfo } from '../hwc.types';
import { queryFunctions } from './services/fg-services';
import { getTinyProConfigure } from '../../core';

export async function getCreateQuestions(fgRuntime) {
  const cliConfig = getTinyProConfigure();
  const existFunctions = await queryFunctions(cliConfig);
  const showChoices = [
    { name: 'FunctionGraph v1', value: 'v1' },
    { name: 'FunctionGraph v2', value: 'v2' },
  ].filter((r) => r.value in fgRuntime);

  return [
    {
      name: 'name',
      type: 'input',
      message:
        '请输入函数名称（长度1-60，包含字母、数字、下划线和中划线，以大/小写字母开头，以字母或数字结尾）',
      validate: (input: string) => {
        const name = input.trim();
        if (name === '') {
          return '请输入函数名称';
        }
        if (existFunctions.find((fn) => fn.func_name === name)) {
          return '函数名称已存在，请重新输入';
        }
        return /^[a-zA-Z][\w|\-]{0,59}$/.test(name) &&
          /[a-zA-Z0-9]/.test(name.slice(-1))
          ? true
          : '函数名称格式错误';
      },
      replace: '请输入函数名称',
    },
    {
      name: 'type',
      type: 'list',
      message: '请选择版本',
      choices: showChoices,
    },
  ];
}

export function getCreateRuntimeQuestions(fgRuntime, ans) {
  return [
    {
      name: 'runtime',
      type: 'list',
      message: '请选择执行环境',
      choices: fgRuntime[ans.type],
    },
    {
      name: 'memory_size',
      type: 'list',
      message: '请选择运行内存',
      choices: '128,256,512,768,1024,1280,1536,1792,2048,2560,3072,3584,4096'
        .split(',')
        .map((size) => {
          return { name: `${size}Mb`, value: parseInt(size, 10) };
        }),
      default: 1,
    },
    {
      name: 'timeout',
      type: 'input',
      message: '请输入超时时间（单位：秒，超时函数将被强行停止，范围3-900秒）',
      default: '300',
      validate: (input) => {
        const n = parseInt(input || '300', 10);
        return n >= 3 && n <= 900 ? true : '超时时间格式错误';
      },
      replace: '请输入超时时间',
    },
  ];
}

export function getFuncUrnQuestions(fgs: Array<FunctionGraphInfo>) {
  return [
    {
      name: 'func_urn',
      type: 'list',
      message: '请选择需要更新的函数',
      choices: fgs.map((fg) => ({ name: fg.func_name, value: fg.func_urn })),
    },
  ];
}
export function getUploadQuestions(
  funcDependLlist: Array<string>,
  allDeps: Array<DependencyInfo>
) {
  return [
    {
      name: 'dirname',
      type: 'input',
      message:
        '请输入本地代码目录（支持完整路径和相对路径，请确保目录存在，例如：D:/code/fgCode、code/fgCode或者./code/fgCode）',
      validate: (input) => {
        const dir = input.trim();
        const cwd = process.cwd();
        const dirPath = path.resolve(cwd, dir);
        if (dir === '') {
          return true;
        }
        if (fs.pathExistsSync(dirPath)) {
          return true;
        }
        return '路径不正确，请重新输入';
      },
      replace: '请输入本地代码的目录',
    },
    {
      name: 'depend_list',
      type: 'checkbox',
      message: '请选择依赖包',
      choices: allDeps.map((dep) => ({
        name: dep.name,
        value: dep.id,
        checked: funcDependLlist.includes(dep.id),
      })),
    },
  ];
}

export function getDepQuestions(deps: Array<DependencyInfo>) {
  const choices = [{ name: '创建依赖包', value: 'create' }];
  // 已经有私有的依赖包，才需要显示更新！
  if (deps.filter((d) => !d.isPublic).length > 0) {
    choices.push({ name: '更新依赖包', value: 'update' });
  }

  return [
    {
      name: 'mode',
      type: 'list',
      message: '请选择',
      choices,
    },
    {
      name: 'depend_id',
      type: 'list',
      message: '请选择依赖包',
      choices: deps
        .filter((dep) => !dep.isPublic)
        .map((dep) => ({
          name: `${dep.name.padEnd(16, ' ').slice(0, 16)}  ${dep.runtime}`,
          value: dep.id,
        })),
      when: (ans) => ans.mode === 'update',
    },
  ];
}

export function getCreateDepQuestions(
  depRuntime: Array<string>,
  existDeps: Array<DependencyInfo>
) {
  return [
    {
      name: 'name',
      type: 'input',
      message:
        '请输入依赖包名称（长度1-96，必须以大、小写字母开头，以字母或数字结尾，只能由字母、数字、下划线、点和中划线组成）',
      validate: (input) => {
        const name = input.trim();

        if (name === '') {
          return '请输入依赖包名称';
        }
        if (existDeps.find((dep) => dep.name === name)) {
          return '依赖包名称已存在，请重新输入';
        }
        return /^[a-zA-Z][\w|\-|\.]{0,95}$/.test(name) &&
          /[a-zA-Z0-9]/.test(name.slice(-1))
          ? true
          : '依赖包名称格式错误';
      },
      replace: '请输入依赖包名称',
    },

    {
      name: 'runtime',
      type: 'list',
      message: '请选择执行环境',
      choices: depRuntime,
      default: 2,
    },
    {
      name: 'dirname',
      type: 'input',
      message:
        '请输入本地依赖目录（支持完整路径和相对路径，请确保目录存在，例如：D:/dependency/fgDep、dependency/fgDep或者./dependency/fgDep）',
      validate: (input) => {
        const dir = input.trim();
        const cwd = process.cwd();
        const dirPath = path.resolve(cwd, dir);
        if (dir === '') {
          return '路径不可为空';
        }
        if (fs.pathExistsSync(dirPath)) {
          return true;
        }
        return '路径不正确，请重新输入';
      },
      replace: '请输入本地依赖目录',
    },
  ];
}

export function getUpdateDepQuestions(
  theDep: DependencyInfo,
  depRuntime: Array<string>,
  existDeps: Array<DependencyInfo>
) {
  return [
    {
      name: 'name',
      type: 'input',
      message:
        '请输入依赖包名称（长度1-96，必须以大、小写字母开头，以字母或数字结尾，只能由字母、数字、下划线、点和中划线组成）',
      validate: (input) => {
        const name = input.trim();
        if (name === '') {
          return '请输入依赖包名称';
        }
        if (
          existDeps.find((dep) => dep.name === name && dep.id !== theDep.id)
        ) {
          return '依赖包名称已存在，请重新输入';
        }
        return /^[a-zA-Z][\w|\-|\.]{0,95}$/.test(name) &&
          /[a-zA-Z0-9]/.test(name.slice(-1))
          ? true
          : '依赖包名称格式错误';
      },
      default: theDep.name,
      replace: '请输入依赖包名称',
    },

    {
      name: 'runtime',
      type: 'list',
      message: '请选择执行环境',
      choices: depRuntime,
      default: theDep.runtime,
    },
    {
      name: 'dirname',
      type: 'input',
      message:
        '请输入本地依赖目录（支持完整路径和相对路径，请确保目录存在，例如：D:/dependency/fgDep、dependency/fgDep或者./dependency/fgDep）',
      validate: (input) => {
        const dir = input.trim();
        const cwd = process.cwd();
        const dirPath = path.resolve(cwd, dir);

        if (dir === '' || fs.pathExistsSync(dirPath)) {
          return true;
        }
        return '路径不正确，请重新输入';
      },
      replace: '请输入本地依赖目录',
    },
  ];
}
