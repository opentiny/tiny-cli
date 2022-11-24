export interface Region {
  id: string; // 区域
  name?: string; // 区域名称
  fg?: {
    v1?: Array<string>;
    v2?: Array<string>;
    dep?: Array<string>;
  };
}

// function graph在每个Region的部署版本及runtime都不一样，所以要配置在相应的Region下
const R6 = 'Node.js6.10';
const R8 = 'Node.js8.10';
const R10 = 'Node.js10.16';
const R12 = 'Node.js12.13';
const R14 = 'Node.js14.18';

// 目前只提供同时支持 OBS、APIG、RDS、FunctionGraph云服务 的最小集
export const TINY_PRO_SUPPORT_REGION_LIST: Array<Region> = [
  {
    name: '中国-香港',
    id: 'ap-southeast-1',
    fg: {
      v1: [R6, R8, R10, R12],
      v2: [R6, R8, R10, R12],
      dep: [R6, R8, R10, R12],
    },
  },
  {
    name: '亚太-曼谷',
    id: 'ap-southeast-2',
    fg: {
      v1: [R6, R8, R10, R12],
      v2: [R6, R8, R10, R12],
      dep: [R6, R8, R10, R12],
    },
  },
  {
    name: '亚太-新加坡',
    id: 'ap-southeast-3',
    fg: {
      v1: [R6, R8, R10, R12],
      v2: [R6, R8, R10, R12, R14],
      dep: [R6, R8, R10, R12, R14],
    },
  },
  {
    name: '华东-上海二',
    id: 'cn-east-2',
    fg: {
      v1: [R6, R8, R10, R12],
      v2: [R6, R8, R10, R12],
      dep: [R6, R8, R10, R12],
    },
  },
  {
    name: '华东-上海一',
    id: 'cn-east-3',
    fg: {
      v2: [R6, R8, R10, R12, R14],
      dep: [R6, R8, R10, R12, R14],
    },
  },
  {
    name: '华北-北京一',
    id: 'cn-north-1',
    fg: {
      v1: [R6, R8, R10, R12],
      dep: [R6, R8, R10, R12],
    },
  },
  {
    name: '华北-北京四',
    id: 'cn-north-4',
    fg: {
      v2: [R6, R8, R10, R12, R14],
      dep: [R6, R8, R10, R12, R14],
    },
  },
  {
    name: '华南-广州',
    id: 'cn-south-1',
    fg: {
      v1: [R6, R8, R10, R12],
      v2: [R6, R8, R10, R12, R14],
      dep: [R6, R8, R10, R12, R14],
    },
  },
];
