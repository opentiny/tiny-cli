import chalk from 'chalk';
import {
  VpcInfo,
  SubnetInfo,
  SecurityGroupInfo,
  FlavorInfo,
  InstanceInfo,
  EipInfo,
} from '../hwc.types';

const groupTypeInfo = {
  normal: '通用增强型',
  normal2: '通用增强Ⅱ型',
  armFlavors: '鲲鹏通用增强型',
  dedicicateNormal: 'x86独享型',
  armLocalssd: '鲲鹏通用型',
  normalLocalssd: 'x86通用型',
  general: '通用型',
  dedicated: '独享型',
  rapid: '独享型',
  bigmem: '超大内存型',
};

const volumnTypeInfo = {
  ULTRAHIGH: 'SSD',
  LOCALSSD: '本地SSD',
  CLOUDSSD: 'SSD云盘',
  ESSD: '极速型SSD',
};

export function getHaQuestions() {
  return [
    {
      name: 'datastore.version',
      type: 'list',
      message: '请选择数据库版本',
      choices: ['5.6', '5.7', '8.0'],
    },
    {
      name: 'ha.mode',
      type: 'list',
      message: '请选择数据库实例类型',
      choices: [
        { name: '主备', value: 'Ha' },
        { name: '单机', value: 'Single' },
      ],
    },
    {
      name: 'ha.replication_mode',
      type: 'list',
      message: '请选择备机同步参数',
      choices: [
        { name: '异步', value: 'async' },
        { name: '半同步', value: 'semisync' },
      ],
      when: (ans) => ans.ha.mode === 'Ha',
    },
  ];
}

export function getFlavorQuestions(validFlavors: Array<FlavorInfo> = []) {
  return [
    {
      name: 'name',
      type: 'input',
      message:
        '请输入实例名称（长度4-64，必须以字母开头，区分大小写，可以包含字母、数字、中文字符、中划线或者下划线，不能包含其他的特殊字符）',
      validate: (input) => {
        const name = input.trim();
        if (name === '') {
          return '请输入实例名称';
        }
        return /^[a-zA-Z][\u4E00-\u9FA5\uF900-\uFA2D\w-]{3,63}$/.test(name)
          ? true
          : '实例名称格式错误';
      },
      replace: '请输入实例名称',
    },
    {
      type: 'table',
      name: 'flavor_ref',
      message: '请选择性能规格',
      colWidths: [10, 20, 15, 15],
      valueKey: 'spec_code',
      displayAnswer: (data: FlavorInfo) => {
        const { group_type, vcpus, ram } = data;
        return `${groupTypeInfo[group_type]} ${vcpus}vCPUs ${ram}GB`;
      },
      columns: [
        {
          name: '序号',
          align: 'center',
          isOrder: true,
        },
        {
          name: '性能规格',
          render: (data: FlavorInfo) => `${groupTypeInfo[data.group_type]}`,
        },
        {
          name: 'CPU(vCPUs)',
          dataKey: 'vcpus',
          align: 'center',
        },
        {
          name: '内存(GB)',
          dataKey: 'ram',
          align: 'center',
        },
      ],
      rows: validFlavors,
    },
  ];
}

export function getVolumnQuestions(validTypes) {
  return [
    {
      name: 'volume.type',
      type: 'list',
      message: '请选择磁盘类型',
      choices: validTypes.map((value) => {
        return {
          name: volumnTypeInfo[value],
          value,
        };
      }),
    },
    {
      name: 'volume.size',
      type: 'input',
      message:
        '请输入磁盘大小（单位：GB，取值范围：40GB-4000GB，必须为 10 的整数倍）',
      default: 40,
      validate: (value) => {
        const val = parseInt(value, 10);
        return val >= 40 && val <= 4000 && val % 10 === 0
          ? true
          : '磁盘大小格式错误';
      },
      replace: '请输入磁盘大小',
    },
  ];
}

export function getAzsQuestions(azs = []) {
  return [
    {
      name: 'availability_zone',
      type: 'list',
      message: '请输入可用区',
      choices: azs,
      when: (ans) => ans.ha.mode === 'Single',
    },
    {
      name: 'first_zone',
      type: 'list',
      message: '请选择主可用区',
      choices: azs,
      when: (ans) => ans.ha.mode === 'Ha',
    },
    {
      name: 'second_zone',
      type: 'list',
      message: '请选择备可用区',
      choices: azs,
      when: (ans) => ans.ha.mode === 'Ha',
    },
    {
      name: 'port',
      type: 'input',
      message:
        '请输入端口号（范围为 1024-65535，其中 12017 和 33071 被 RDS 系统占用不可设置）',
      default: '3306',
      validate: (input) => {
        const port = parseInt(input.trim(), 10);
        return port >= 1024 && port <= 65535 && port !== 12017 && port !== 33071
          ? true
          : '端口号格式错误';
      },
      replace: '请输入端口号',
    },
    {
      name: 'password',
      type: 'password',
      message:
        '请输入数据库密码（长度8~32，至少包含大写字母、小写字母、数字、特殊字符三种字符的组合；允许输入~!@#$%^*-_=+?,()&特殊字符）',
      validate: (input: string) => {
        const pwd = input.trim();
        if (pwd.length < 8 || pwd.length > 32) {
          return '密码长度要介于8~32，请重新输入';
        }

        const regUpcase = /[A-Z]/;
        const regLowercase = /[a-z]/;
        const regDigit = /[0-9]/;
        const regSymbol = /[~!@#$%^*\-_=+?,()&]/;
        let passCount = 0;
        const checkReg = (reg: RegExp) => (passCount += reg.test(pwd) ? 1 : 0);

        checkReg(regUpcase);
        checkReg(regLowercase);
        checkReg(regDigit);
        checkReg(regSymbol);
        if (passCount < 3) {
          return '至少包含大写字母、小写字母、数字、特殊字符三种字符的组合，请重新输入';
        }

        const regAll = /^[A-Za-z0-9~!@#$%^*\-_=+?,()&]*$/;
        if (!regAll.test(pwd)) {
          return '允许输入~!@#$%^*-_=+?,()&特殊字符，请重新输入';
        }

        return true;
      },
      replace: '请输入数据库密码',
    },
  ];
}

export function getVpcQuestions(vpcs: Array<VpcInfo>) {
  const vpcMsg = chalk.yellow(vpcs.length.toString());

  return [
    {
      name: 'useExistVpc',
      type: 'confirm',
      message: `当前 Region 有 ${vpcMsg} 个虚拟私有云，是否关联已有虚拟私有云（输入 ${chalk.yellow(
        'n'
      )} 进入新建虚拟私有云流程）？`,
      default: true,
      when: () => vpcs.length > 0,
      replace: '是否关联已有虚拟私有云？',
    },
    {
      type: 'table',
      name: 'vpc_id',
      message: '请选择私有云',
      colWidths: [10, 20, 20, 20],
      valueKey: 'id',
      displayAnswer: (data: VpcInfo) => data.name,
      columns: [
        {
          name: '序号',
          align: 'center',
          isOrder: true,
        },
        {
          name: '名称',
          dataKey: 'name',
        },
        {
          name: '无类域间路由',
          dataKey: 'cidr',
        },
        {
          name: '子网数',
          align: 'center',
          render: (data: VpcInfo) => {
            return data.cloud_resources.find(
              (r) => r.resource_type === 'virsubnet'
            ).resource_count;
          },
        },
      ],
      rows: vpcs,
      when: (ans) => ans.useExistVpc,
    },
  ];
}

export function getIsCreateSubnetQuestions(vpc: VpcInfo) {
  return [
    {
      name: 'isCreateSubnet',
      type: 'confirm',
      message: `虚拟私有云 ${chalk.yellow(
        vpc.name
      )} 没有配置子网，是否立即创建子网？（输入 ${chalk.yellow(
        'n'
      )} 重新选择虚拟私有云）`,
    },
  ];
}

export function getSubnetQuestions(subnets: Array<SubnetInfo>) {
  return [
    {
      name: 'subnet_id',
      type: 'list',
      message: '请选择子网',
      choices: subnets.map((f) => ({
        name: f.name,
        value: f.id,
      })),
    },
  ];
}

export function getSecurityQuestions(securityGroups: Array<SecurityGroupInfo>) {
  return [
    {
      name: 'security_group_id',
      type: 'list',
      message: '请选择安全组',
      choices: securityGroups.map((f) => ({
        name: f.name,
        value: f.id,
      })),
    },
  ];
}

export function getFeeQuestions() {
  return [
    {
      name: 'charge_info.charge_mode',
      type: 'list',
      message: '请选择计费模式',
      choices: [
        { name: '包年/包月', value: 'prePaid' },
        { name: '按需计费', value: 'postPaid' },
      ],
    },
    {
      name: 'charge_info.period_type',
      type: 'list',
      message: '请选择',
      choices: [
        { name: '包年', value: 'year' },
        { name: '包月', value: 'month' },
      ],
      when: (ans) => ans.charge_info.charge_mode === 'prePaid',
    },
    {
      name: 'charge_info.period_num',
      type: 'list',
      message: '请选择包年时长',
      choices: [
        { name: '1年', value: '1' },
        { name: '2年', value: '2' },
        { name: '3年', value: '3' },
      ],
      when: (ans) => ans.charge_info.period_type === 'year',
    },
    {
      name: 'charge_info.period_num',
      type: 'list',
      message: '请选择包月时长',
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
        name: `${i} 个月`,
        value: i,
      })),
      when: (ans) => ans.charge_info.period_type === 'month',
    },
    {
      name: 'charge_info.is_auto_renew',
      type: 'confirm',
      message: '是否自动续费?',
      when: (ans) => ans.charge_info.charge_mode === 'prePaid',
    },
  ];
}

export function getMysqlQuestions(mysqls: Array<InstanceInfo>) {
  return [
    {
      name: 'instance_id',
      type: 'table',
      message: '请选择数据库',
      colWidths: [10, 20, 20],
      valueKey: 'id',
      displayAnswer: (data: InstanceInfo) => data.name,
      columns: [
        {
          name: '序号',
          align: 'center',
          isOrder: true,
        },
        {
          name: '名称',
          dataKey: 'name',
        },
        {
          name: '数据库版本',
          dataKey: 'datastore.version',
          render: (data) => {
            return `MySql${data.datastore.version}`;
          },
        },
        {
          name: '绑定Eip',
          dataKey: 'public_ips',
          render: (data) => {
            return data.public_ips[0] || '';
          },
        },
      ],
      rows: mysqls,
    },
  ];
}

export function getEipQuestions(eips: Array<EipInfo>) {
  const eipMsg = chalk.yellow(eips.length.toString());

  return [
    {
      name: 'useExistEip',
      type: 'confirm',
      message: `当前 Region 有 ${eipMsg} 个弹性IP，是否关联已有弹性IP（输入 ${chalk.yellow(
        'n'
      )} 进入新建弹性IP流程）？`,
      default: true,
      when: () => eips.length > 0,
      replace: '是否关联已有弹性IP？',
    },
    {
      type: 'table',
      name: 'eip_id',
      message: '请选择弹性IP',
      colWidths: [10, 20, 20],
      valueKey: 'id',
      displayAnswer: (data: EipInfo) => data.alias,
      columns: [
        {
          name: '序号',
          align: 'center',
          isOrder: true,
        },
        {
          name: '名称',
          dataKey: 'alias',
        },
        {
          name: 'IP地址',
          dataKey: 'public_ip_address',
        },
      ],
      rows: eips,
      when: (ans) => ans.useExistEip,
    },
  ];
}

export function getUnbindQuestions() {
  return [
    {
      name: 'mode',
      type: 'list',
      message: `是否解除EIP绑定？`,
      choices: [
        {
          name: `重新绑定`,
          value: 'rebind',
        },
        {
          name: `解除绑定`,
          value: 'unbind',
        },
      ],
    },
  ];
}
