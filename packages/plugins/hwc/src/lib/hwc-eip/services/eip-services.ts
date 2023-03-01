import hcloudClient from '../../../core/hcloud-client';
import {
  CreateEipOptions,
  CreateSharedBandwidthOptions,
  QueryBandwidthListOptions,
} from '../types';
import { ChargeModes } from '../constants';
import { isPlainObject, isArray } from 'lodash';

/**
 * 将配置对象转换成 KooCli 命令参数
 *
 * e.g.:
 * - 简单对象：{ name: 'name', type: 'type' } => '--name=name --type=type'
 * - 嵌套对象：{ params: { name: 'name', type: 'type' } } => '--params.name=name --params.type=type'
 * - 数组(KooCli 数组参数索引从 1 开始)：{ params: [{ name: 'name', type: 'type' }] } => '--params.1.name=name --params.1.type=type'
 *
 * @param options
 * @returns
 */

function transformOptionsToCliArgs(options: Record<string, any>): string {
  const args = [];
  const validTypes = ['number', 'boolean', 'string'];
  const transformer = (target: any, prePath?: string) => {
    Object.keys(target).forEach((key) => {
      let value = target[key];
      // kooCli 数组参数索引从 1 开始
      const pathKey = isArray(target) ? `${Number(key) + 1}` : key;
      const curPath = prePath ? `${prePath}.${pathKey}` : pathKey;
      const valueType = typeof value;
      // 避免前后空格导致出错
      value = valueType === 'string' ? value.trim() : value;

      if (isPlainObject(value) || isArray(value)) {
        transformer(value, curPath);
      } else if (validTypes.includes(valueType)) {
        args.push(`--${curPath}=${value}`);
      }
    });
  };

  transformer(options);

  return args.join(' ');
}

// 执行 hcloud eip <cmd>
const execEipCmd = async (cmd: string, options?: Record<string, any>) => {
  const hcloudCmd = `hcloud eip ${cmd}`;
  const args = options ? transformOptionsToCliArgs(options) : '';
  const res = await hcloudClient.execJson(`${hcloudCmd} ${args}`);

  return res;
};

// 查询带宽列表
export const queryBandwidthList = async (
  options: QueryBandwidthListOptions
) => {
  const cmd = 'ListBandwidths';
  const res = await execEipCmd(cmd, options);

  return res;
};

// 创建共享带宽
export const createSharedBandwidth = async (
  options: CreateSharedBandwidthOptions
) => {
  const cmd = 'CreateSharedBandwidth';
  const res = await execEipCmd(cmd, {
    bandwidth: options,
  });

  return res;
};

// 查询 Eip 列表
export const queryEipList = async () => {
  const cmd = 'ListPublicips/v2';
  const res = await execEipCmd(cmd);

  return res;
};

// 创建 Eip
export const createEip = async (options: CreateEipOptions) => {
  const { extendParam } = options;
  const { charge_mode } = extendParam;
  const isPrePaid = charge_mode === ChargeModes.prePaid;
  const cmd = isPrePaid ? 'CreatePrePaidPublicip' : 'CreatePublicip';
  if (!isPrePaid) {
    // 按需模式不需要 extendParam
    delete options.extendParam;
  }
  const res = await execEipCmd(cmd, options);

  return res;
};
