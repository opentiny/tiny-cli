// 弹性公网 IP 版本
export type IpVersion = 4 | 6;

// 弹性公网 IP 线路类型
export type EipType = '5_bgp' | '5_sbgp';

// 付费模式
export type ChargeMode = 'prePaid' | 'postPaid';

// 时长类型
export type PeriodType = 'month' | 'year';

// 带宽类型
export type BandwidthShareType = 'PER' | 'WHOLE';

// 带宽计费类型
export type BandwidthChargeMode = 'bandwidth' | 'traffic';

// Eip 参数
export interface EipOptions {
  // Eip 名称
  alias: string;
  // 线路类型
  type: EipType;
  // IP 版本
  ip_version?: IpVersion;
}

// 带宽参数
export interface BandwidthOptions {
  // id, 为共享带宽必传
  id?: string;
  // 名称
  name: string;
  // 带宽大小
  size: number;
  // 付费模式
  charge_mode?: BandwidthChargeMode;
}

// 付费相关参数
export interface PaidOptions {
  // 付费模式
  charge_mode: chargeMode;
  // 时长数
  period_num?: number;
  // 时长类型
  period_type?: PeriodType;
  // 是否自动付款，否的话需要在费用平台自行支付
  is_auto_pay?: boolean;
  // 是否自动续费
  is_auto_renew?: boolean;
}

// Eip 创建参数
export interface CreateEipOptions {
  // Eip 参数
  publicip: EipOptions;
  // 带宽参数
  bandwidth: BandwidthOptions;
  // 扩展参数（付费相关）
  extendParam: PaidOptions;
}

// 共享带宽创建参数
export interface CreateSharedBandwidthOptions {
  name: string;
  size: number;
}

// 带宽列表查询参数
export interface QueryBandwidthListOptions {
  // 带宽类型
  share_type: BandwidthShareType;
  // 每页返回个数
  limit?: number;
  // 取值为上一页数据的最后一条记录的id, 为空时为查询第一页
  marker?: string;
}
