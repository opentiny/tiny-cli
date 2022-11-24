// 弹性公网 IP 版本
export const enum IpVersions {
  ipv4 = 4,
  ipv6 = 6,
}

// 弹性公网 IP 线路类型
export const enum EipTypes {
  // 全动态 bgp
  bgp = '5_bgp',
  // 静态 bgp
  sbgp = '5_sbgp',
}

// 付费模式
export const enum ChargeModes {
  // 包年包月模式
  prePaid = 'prePaid',
  // 按需模式
  postPaid = 'postPaid',
}

// 时长类型
export const enum PeriodTypes {
  month = 'month',
  year = 'year',
}

// 带宽类型
export const enum BandwidthShareTypes {
  // 独占带宽
  PER = 'PER',
  // 共享带宽
  WHOLE = 'WHOLE',
}

// 带宽计费类型
export const enum BandwidthChargeModes {
  // 按带宽计费
  bandwidth = 'bandwidth',
  // 按流量计费
  traffic = 'traffic',
}

// 时长周期可选年数
export const PERIOD_YEARS = [1, 2, 3];

// 时长周期可选年月数
export const PERIOD_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
