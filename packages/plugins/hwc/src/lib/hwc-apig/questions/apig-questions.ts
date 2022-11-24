import chalk from 'chalk';
import { FunctionGraphInfo } from '../../hwc.types';
import { getTinyProConfigure } from '../../../core';
import { getApigList } from '../services/apig-service';
const uriQuest = {
  name: 'req_uri',
  type: 'input',
  message:
    '请输入请求路径（请求path可以包含请求参数，请求参数使用{}标识，例如/a/{b}，也可以通过配置"+"号做前缀匹配，例如：/a/{b+} ）',
  replace: '请输入请求路径',
  validate: (input, ans) => {
    const url: string = input.trim();
    if (url === '') {
      return '请输入请求路径';
    }
    if (ans.match_mode === 'SWA' && url.includes('+')) {
      return '前缀匹配的路径不需要添加“+”号';
    }
    // 校验url有效性
    const regPath = /^[\w\.\-\%\*]*$/;
    const regBracket = /^\{.*\+?\}$/;
    const regName = /^[a-zA-Z][\w-\.]{0,31}$/;
    const isValid =
      url.length <= 512 &&
      url.startsWith('/') && //  / 打头
      !url.includes('//') && //  不能连续//
      url
        .split('/')
        .filter((path) => path !== '')
        .every((path) => {
          return (
            regPath.test(path) || // 普通路径时： 只允许  . % - _ * 特殊符号！
            (regBracket.test(path) && // 参数路径时：
              regName.test(path.slice(1, -1).replace('+', ''))) // 校验 {path params}
          );
        });
    return isValid ? true : '请求路径格式错误';
  },
};
// name
export async function getNameQuestions(instanceId: string) {
  const cliConfig = getTinyProConfigure();
  const existApigList = await getApigList(instanceId, cliConfig.region.id);

  return [
    {
      name: 'name',
      type: 'input',
      message:
        '请输入API网关名称（长度3-255，以英文和汉字开头，支持汉字，英文，数字，下划线）',
      validate: (input, currAns) => {
        const name = input.trim();

        if (name === '') {
          return '请输入API网关名称';
        }
        const sameName = existApigList.find(
          (apig) => currAns.group_id === apig.group_id && apig.name === name
        );
        if (sameName) {
          return 'API网关已存在，请重新输入';
        }
        const reg =
          /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D][a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D\d_]{2,254}$/;
        return reg.test(name) ? true : 'API名称格式错误';
      },
      replace: '请输入API名称',
    },
  ];
}

export function getGroupQuestions(groups) {
  return [
    {
      name: 'useExistGroup',
      type: 'confirm',
      message: `当前 Region 下有 ${chalk.yellow(
        groups.length
      )} 个API网关分组，是否关联已有API网关分组（输入 ${chalk.yellow(
        'n'
      )} 进入新建API网关分组流程）？`,
      when: () => groups.length > 0,
    },
    {
      name: 'group_id',
      type: 'list',
      message: `请选择分组`,
      choices: groups.map((g) => ({
        name: g.name,
        value: g.id,
      })),
      when: (ans) => ans.useExistGroup,
    },
  ];
}

// 类型，协议，url等
export function getProtocolQuestions() {
  return [
    {
      name: 'type',
      type: 'list',
      message: '请选择类型',
      choices: [
        { name: '公有API', value: 1 },
        { name: '私有API', value: 2 },
      ],
    },
    {
      name: 'req_protocol',
      type: 'list',
      message: '请选择请求协议',
      choices: [
        { name: 'HTTP', value: 'HTTP' },
        { name: 'HTTPS', value: 'HTTPS' },
        { name: 'HTTP&HTTPS', value: 'BOTH' },
      ],
      default: 1,
    },
    {
      name: 'match_mode',
      type: 'list',
      message: '请选择匹配模式',
      choices: [
        { name: '绝对匹配', value: 'NORMAL' },
        { name: '前缀匹配', value: 'SWA' },
      ],
    },
    // req_uri询问
    uriQuest,
    {
      name: 'req_method',
      type: 'list',
      message: '请选择请求方式',
      choices: 'GET,POST,PUT,DELETE,HEAD,PATCH,OPTIONS,ANY'.split(','),
    },
    {
      name: 'cors',
      type: 'confirm',
      message: '是否支持跨域？',
    },
    {
      name: 'auth_type',
      type: 'list',
      message: '请选择认证方式',
      choices: [
        { name: 'IAM认证', value: 'IAM' },
        { name: '无认证', value: 'NONE' },
      ],
    },
  ];
}

// 询问fg参数
export function getFgQuestions(fgs: Array<FunctionGraphInfo>) {
  return [
    {
      name: 'func_info.function_urn',
      type: 'list',
      message: '请选择一个函数工作流中的函数做后端服务',
      choices: fgs.map((fg) => ({
        name: fg.func_name,
        value: fg.func_urn,
      })),
    },
    {
      name: 'func_info.invocation_type',
      type: 'list',
      message: '请选择函数的调用类型',
      choices: [
        { name: '同步', value: 'sync' },
        { name: '异步', value: 'async' },
      ],
    },
    {
      name: 'func_info.timeout',
      type: 'input',
      message: '请输入后端函数超时时间（单位：ms，最大60000，最小为1）',
      default: 5000,
      validate: (input) => {
        const timeout = parseInt(input, 10);
        return timeout >= 1 && timeout <= 60000 ? true : '后端函数超时格式错误';
      },
      replace: '请输入后端函数超时时间',
    },
  ];
}

// 重新询问url
export function getUrlQuestions() {
  return [uriQuest];
}
