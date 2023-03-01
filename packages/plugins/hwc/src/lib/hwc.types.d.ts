export interface CliOption {
  clientArgs: Array<string>; // 命令
  clientOptions: any; // 参数
}

export interface FlavorInfo {
  vcpus: string;
  ram: number;
  id: string;
  spec_code: string;
  instance_mode: string;
  az_status: Record<string, string>;
  az_desc: Record<string, string>;
  version_name: string[];
  group_type: string;

  az_info?: {
    value: string;
    name: string;
  }[];
}

export interface StorageTypeInfo {
  name: string; // 只有英文键值  CLOUDSSD
  az_status: Record<string, string>; // 可用区要匹配normal   {"cn-south-2b":"normal"}
  support_compute_group_type: string[]; // 要匹配flavor中的grouptype  ["general","dedicated"]
}

export interface VpcInfo {
  id: string;
  name: string;
  description: string;
  cidr: string;
  extend_cidrs: any[];
  status: string;
  project_id: string;
  enterprise_project_id: string;
  tags: any[];
  created_at: string;
  updated_at: string;
  cloud_resources: {
    resource_type: string;
    resource_count: number;
  }[];
}

export interface SubnetInfo {
  id: string;
  name: string;
  description: string;
  cidr: string;
  dnsList: string[];
  status: string;
  scope: string;
  vpc_id: string;
  ipv6_enable: boolean;
  gateway_ip: string;
  dhcp_enable: boolean;
  primary_dns: string;
  secondary_dns: string;
  availability_zone: string;
  neutron_network_id: string;
  neutron_subnet_id: string;
  extra_dhcp_opts: any[];
}

export interface SecurityGroupInfo {
  id: string;
  name: string;
  project_id: string;
  description: string;
  enterprise_project_id: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityGroupRulesInfo {
  id: string;
  project_id: string;
  description: string;
  created_at: string;
  updated_at: string;
  security_group_id: string;
  remote_group_id: string;
  direction: string;
  protocol: string;
  ethertype: string;
  remote_ip_prefix: string;
  multiport: string;
  remote_address_group_id: string;
  action: string;
  priority: number;
}

export interface FunctionGraphInfo {
  func_urn: string;
  func_name: string;
  domain_id: string;
  namespace: string;
  project_name: string;
  package: string;
  runtime: string;
  timeout: number;
  handler: string;
  memory_size: number;
  cpu: number;
  code_type: string;
  code_filename: string;
  code_size: number;
  user_data: string;
  digest: string;
  version: string;
  image_name: string;
  xrole: string;
  app_xrole: string;
  last_modified: string;
  func_code: any;
  FuncCode: any;
  concurrency: number;
  concurrent_num: number;
  strategy_config: {
    concurrency: number;
    concurrent_num: number;
  };
  func_vpc_id: string;
  long_time: boolean;
  type: string;
  enable_cloud_debug: string;
  enable_dynamic_memory: boolean;
  custom_image: any;
  is_stateful_function: boolean;
  enable_auth_in_header: boolean;
  reserved_instance_idle_mode: boolean;
}

export interface AgencyInfo {
  create_time: string;
  description: string;
  domain_id: string;
  duration: string;
  expire_time?: any;
  id: string;
  name: string;
  trust_domain_id: string;
  trust_domain_name: string;
}
export interface MysqlCreateOption {
  name: string;
  datastore: {
    type: 'MySQL' | 'PostgreSQL' | 'SQLServer';
    version: string;
  };
  ha: {
    mode: 'Ha' | 'Single';
    replication_mode: 'async' | 'semisync' | 'sync';
  };
  port: string;
  password?: string;
  flavor_ref: string; // 规格码,取值范围:非空。  使用查询数据库规格接口响应消息中的 flavors字段中“spec_code”获取且对应az_status为“在售”状态
  validFlavors?: Array<FlavorInfo>;
  currFlavor?: FlavorInfo;
  vpcs?: Array<VpcInfo>;
  volume: {
    type: 'ULTRAHIGH' | 'LOCALSSD' | 'CLOUDSSD' | 'ESSD'; //磁盘类型。
    size: number; // 磁盘大小 取值范围：40GB~4000GB，必须为10的整数倍
  };
  region: string;
  availability_zone: string;
  first_zone: string;
  second_zone: string;
  vpc_id: string;
  subnet_id: string;
  security_group_id: string;
  charge_info: {
    charge_mode: 'prePaid' | 'postPaid'; // 预付费，即包年/包月。 后付费，即按需付费
    period_type: 'month' | 'year';
    period_num: number;
    is_auto_renew: boolean;
    is_auto_pay: boolean;
  };
  count: number; // 购买数量
}

export interface InstanceInfo {
  id: string;
  status: string;
  name: string;
  port: number;
  type: string;
  ha: {
    mode?: string;
    replication_mode?: string;
  };
  region: string;
  datastore: {
    type: string;
    version: string;
  };
  created: string;
  updated: string;
  volume: {
    type: string;
    size: number;
  };
  nodes: {
    id: string;
    name: string;
    role: string;
    status: string;
    availability_zone: string;
  }[];
  tags: any[];
  bpDomainId: string;
  bpType: string;
  alias: string;
  private_ips: string[];
  private_dns_names: string[];
  public_ips: any[];
  enable_ssl: boolean;
  db_user_name: string;
  vpc_id: string;
  subnet_id: string;
  security_group_id: string;
  flavor_ref: string;
  cpu: string;
  mem: string;
  switch_strategy: string;
  charge_info: {
    charge_mode: string;
    period_type?: string;
    period_num?: number;
    is_auto_renew?: boolean;
    is_auto_pay?: boolean;
  };
  backup_strategy: {
    start_time: string;
    keep_days: number;
  };
  maintenance_window: string;
  related_instance: any[];
  disk_encryption_id: string;
  enterprise_project_id: string;
  time_zone: string;
  order_id: string;
  associated_with_ddm: boolean;
}

export interface DependencyInfo {
  id: string;
  owner: string;
  link: string;
  runtime: string;
  etag: string;
  size: number;
  name: string;
  file_name: string;
  isPublic?: boolean;
}

export interface FunctionGraphCodeInfo {
  func_urn: string;
  func_name: string;
  domain_id: string;
  runtime: string;
  code_type: string;
  code_filename: string;
  code_size: number;
  digest: string;
  last_modified: string;
  func_code: {
    link: string;
  };
  depend_list: string[];
  strategy_config: {
    concurrency: number;
    concurrent_num: number;
  };
  dependencies: DependencyInfo[];
}

// 创建后返回的信息
export interface ApigInstanceInfo {
  id: string;
  spec: string;
  project_id: string;
  instance_name: string;
  status: string;
  instance_status: number;
  eip_address?: any;
  type: string;
  create_time: number;
  charging_mode: number;
  cbc_metadata: string;
  enterprise_project_id: string;
  loadbalancer_provider: string;
}

export interface ApigGroupInfo {
  id: string;
  name: string;
  status: number;
  sl_domain: string;
  register_time: string;
  update_time: string;
  on_sell_status: number;
  url_domains: any[];
  sl_domains: string[];
  remark: string;
  call_limits: number;
  time_interval: number;
  time_unit: string;
  is_default: number;
  version: string;
  roma_app_id: string;
  roma_app_name: string;
}

export interface ApigInfo {
  name: string;
  type: number;
  version: string;
  req_protocol: string;
  req_method: string;
  req_uri: string;
  auth_type: string;
  auth_opt: {
    app_code_auth_type: string;
  };
  cors: boolean;
  match_mode: string;
  backend_type: string;
  remark: string;
  group_id: string;
  body_remark: string;
  result_normal_sample: string;
  result_failure_sample: string;
  authorizer_id: string;
  tags: any[];
  tag: string;
  roma_app_id: string;
  domain_name: string;
  id: string;
  status: number;
  arrange_necessary: number;
  register_time: string;
  update_time: string;
  group_name: string;
  group_version: string;
  run_env_name: string;
  run_env_id: string;
  publish_id: string;
  publish_time: string;
  roma_app_name: string;
  ld_api_id: string;
  backend_api?: any;
  api_group_info?: any;
  req_params?: any;
}

export interface EipInfo {
  id: string;
  alias: string;
  type: string;
  public_ip_address: string;
  status: string;
  tenant_id: string;
  create_time: string;
  bandwidth_id: string;
  bandwidth_name: string;
  bandwidth_share_type: string;
  bandwidth_size: number;
  profile: {
    user_id: string;
    product_id: string;
    region_id: string;
    order_id: string;
  };
  tags: any[];
  enterprise_project_id: string;
  ip_version: number;
  public_border_group: string;
  allow_share_bandwidth_types: string[];
}

export interface DatabaseInfo {
  name: string;
  character_set: string;
}
