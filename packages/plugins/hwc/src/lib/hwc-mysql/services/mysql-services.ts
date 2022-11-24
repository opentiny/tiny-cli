import hcloudClient from '../../../core/hcloud-client';
import {
  MysqlCreateOption,
  FlavorInfo,
  InstanceInfo,
  SecurityGroupInfo,
  StorageTypeInfo,
  SubnetInfo,
  VpcInfo,
} from '../../hwc.types';

/** 查询所有实例 */
export const queryInstances = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud rds ListInstances
      --project_id="${cliConfig.projectId}"
      --datastore_type="MySQL" `
  );
  return res.instances as Array<InstanceInfo>;
};

/** 查询mysql的所有规格 */
export const queryFlavors = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud rds ListFlavors
      --database_name="MySQL"
      --project_id="${cliConfig.projectId}"`
  );
  return res.flavors as Array<FlavorInfo>;
};

/** 查询规格下的磁盘类型 */
export const queryVolumnTypes = async (cliConfig, ans) => {
  const res = await hcloudClient.execJson(
    `hcloud rds ListStorageTypes 
      --cli-region="${cliConfig.region.id}"
      --project_id="${cliConfig.projectId}" 
      --database_name="MySQL" 
      --version_name="${ans.datastore.version}" 
      --ha_mode="${ans.ha.mode.toLowerCase()}"`
  );
  return res.storage_type as Array<StorageTypeInfo>;
};

/** 查询vpc列表 */
export const queryVpcs = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud vpc ListVpcs/v3
      --project_id="${cliConfig.projectId}"`
  );
  return res.vpcs as Array<VpcInfo>;
};

/** 查询子网列表 */
export const querySubnets = async (cliConfig, vpcId) => {
  const res = await hcloudClient.execJson(
    `hcloud vpc ListSubnets
      --project_id="${cliConfig.projectId}"
      --vpc_id="${vpcId}"`
  );
  return res.subnets as Array<SubnetInfo>;
};

/** 查询安全组列表 */
export const querySecurityGroups = async (cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud vpc ListSecurityGroups/v3
      --project_id="${cliConfig.projectId}"`
  );
  return res.security_groups as Array<SecurityGroupInfo>;
};

/** 创建数据库实例 */
export const createInstance = async (ans: MysqlCreateOption, cliConfig) => {
  let cmd = `hcloud rds CreateInstance
  --project_id="${cliConfig.projectId}"
  --cli-region="${cliConfig.region.id}"
  --name="${ans.name}"
  --datastore.type="${ans.datastore.type}"
  --datastore.version="${ans.datastore.version}"
  --flavor_ref="${ans.flavor_ref}"

  --volume.type="${ans.volume.type}"
  --volume.size="${ans.volume.size}"

  --region="${ans.region}"
  --availability_zone="${
    ans.ha.mode === 'Single'
      ? ans.availability_zone
      : `${ans.first_zone},${ans.second_zone}`
  }"
  --port="${ans.port}"
  --password="${ans.password}"

  --vpc_id="${ans.vpc_id}"
  --subnet_id="${ans.subnet_id}"
  --security_group_id="${ans.security_group_id}"

  --charge_info.charge_mode="${ans.charge_info.charge_mode}"
  `;
  if (ans.ha.mode === 'Ha') {
    cmd += ` 
    --ha.mode="${ans.ha.mode}"
    --ha.replication_mode="${ans.ha.replication_mode}" `;
  }
  if (ans.charge_info.charge_mode === 'prePaid') {
    cmd += `
    --charge_info.period_type="${ans.charge_info.period_type}"
    --charge_info.period_num="${ans.charge_info.period_num}"
    --charge_info.is_auto_renew=${ans.charge_info.is_auto_renew}
    --charge_info.is_auto_pay=${ans.charge_info.is_auto_pay} `;
  }
  const res = await hcloudClient.exec(cmd, 'b'); // 由于password参数影响， hcloud会询问。b表示使用命令行中的参数！
  return res;
};

/** 绑定EIP */
export const attachEip = async (ans, cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud rds AttachEip
      --cli-region="${cliConfig.region.id}"
      --project_id="${cliConfig.projectId}"
      --is_bind=true 
      --instance_id="${ans.instance_id}" 
      --public_ip="${ans.public_ip}" 
      --public_ip_id="${ans.public_ip_id}" `
  );

  return res;
};

/** 反绑定EIP */
export const unbindEip = async (ans, cliConfig) => {
  const res = await hcloudClient.execJson(
    `hcloud rds AttachEip
      --cli-region="${cliConfig.region.id}"
      --project_id="${cliConfig.projectId}"
      --is_bind=false 
      --instance_id="${ans.instance_id}" `
  );

  return res;
};
/** 获取有效的规格信息 */
export const getValidFlavors = (
  flavors: Array<FlavorInfo>,
  version: string,
  haMode: string
) => {
  let validFlavors = flavors.filter(
    (f) =>
      f.instance_mode === haMode.toLowerCase() &&
      f.version_name.includes(version) &&
      Object.values(f.az_status).includes('normal')
  );
  // 补充az_info,记录有效的az信息
  validFlavors.forEach((f) => {
    f.az_info = [];
    for (const id in f.az_status) {
      if (f.az_status[id] === 'normal') {
        f.az_info.push({
          name: f.az_desc[id],
          value: id,
        });
      }
    }
  });
  // 按规格排序, cpu+ram
  validFlavors = validFlavors.sort((f1, f2) => {
    const f1cpu = parseInt(f1.vcpus, 10);
    const f2cpu = parseInt(f2.vcpus, 10);
    if (f1cpu > f2cpu) {
      return 1;
    }
    if (f1cpu < f2cpu) {
      return -1;
    }
    return f1.ram > f2.ram ? 1 : -1;
  });
  return validFlavors;
};

// 根据flavor,az，过滤出可用的磁盘类型
export const getValidVolumntypes = (
  flavor: FlavorInfo,
  allTypes: Array<StorageTypeInfo>
) => {
  // 根据用户选择的flavor，去判断剩余哪些磁盘类型
  let validTypes: Array<string> = [];
  allTypes.forEach((type) => {
    // 1、grouptype在falvor支持
    if (type.support_compute_group_type.includes(flavor.group_type)) {
      // 2、 可用区az_status  与flavor的az_info 有交集
      const az1 = Object.keys(type.az_status);
      const az2 = flavor.az_info.map((az) => az.value);
      if (az1.filter((az) => az2.includes(az)).length > 0) {
        validTypes.push(type.name);
      }
    }
  });
  // 通用型不允许选ESSD
  if (flavor.group_type !== 'dedicated') {
    validTypes = validTypes.filter((t) => t !== 'ESSD');
  }
  return validTypes;
};
