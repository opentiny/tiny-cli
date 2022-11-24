import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import {
  fmtDashTitle,
  inquirer,
  CONSTANTS,
  setHwcExports,
} from '../../../core';
import { BandwidthShareType, ChargeMode } from '../types';
import {
  createEip as createEipService,
  createSharedBandwidth,
  queryBandwidthList,
  queryEipList,
} from '../services/eip-services';
import { EipValidator } from '../services/validate';
import {
  IpVersions,
  EipTypes,
  ChargeModes,
  PeriodTypes,
  BandwidthShareTypes,
  BandwidthChargeModes,
  PERIOD_MONTHS,
  PERIOD_YEARS,
} from '../constants';

type Answers = inquirer.Answers;

export const commandName = '创建弹性公网IP';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-eip`
);

// 包年/包月模式付费选项
const getPrePaidQuestions = () => {
  const questions = [
    {
      type: 'list',
      name: 'period_type',
      message: '请选择购买时长类型',
      choices: [
        {
          name: '包月',
          value: PeriodTypes.month,
        },
        {
          name: '包年',
          value: PeriodTypes.year,
        },
      ],
    },
    {
      type: 'list',
      name: 'period_num',
      message: '请选择购买月数',
      choices: PERIOD_MONTHS.map((value) => ({
        value,
        name: `${value} 个月`,
      })),
      when: (answers: Answers) => answers.period_type === PeriodTypes.month,
    },
    {
      type: 'list',
      name: 'period_num',
      message: '请选择购买年数',
      choices: PERIOD_YEARS.map((value) => ({
        value,
        name: `${value} 年`,
      })),
      when: (answers: Answers) => answers.period_type === PeriodTypes.year,
    },
    {
      type: 'confirm',
      name: 'is_auto_renew',
      message: '请选择是否自动续订',
      default: false,
    },
  ];

  return questions;
};

// 问询付费相关选项
const getChargePrompt = async () => {
  const chargeModeQuestions = [
    {
      type: 'list',
      name: 'charge_mode',
      message: '请选择付费模式',
      choices: [
        {
          name: '包年/包月',
          value: ChargeModes.prePaid,
        },
        {
          name: '按需付费',
          value: ChargeModes.postPaid,
        },
      ],
    },
  ];
  let answers = await inquirer.prompt(chargeModeQuestions);

  // 包年/包月模式
  if (answers.charge_mode === ChargeModes.prePaid) {
    const prePaidQuestions = getPrePaidQuestions();

    answers = await inquirer.prompt(prePaidQuestions, {
      // 自动支付
      is_auto_play: true,
      ...answers,
    });
  }

  return answers;
};

// 问询 Eip 选项
const getEipPrompt = async () => {
  const nameMsg = '请输入弹性公网IP名称';
  const questions = [
    {
      type: 'input',
      name: 'alias',
      message: `${nameMsg}（名称可以为空，不为空时长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点））`,
      replace: nameMsg,
      validate: (str: string) => {
        return EipValidator.validateName(str, '弹性公网IP名称');
      },
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择弹性公网IP线路类型',
      choices: [
        {
          name: '全动态BGP',
          value: EipTypes.bgp,
        },
        {
          name: '静态BGP',
          value: EipTypes.sbgp,
        },
      ],
    },
    {
      type: 'list',
      name: 'ip_version',
      message: '请选择弹性公网IP版本',
      choices: [
        {
          name: 'ipv4',
          value: IpVersions.ipv4,
        },
        {
          name: 'ipv6',
          value: IpVersions.ipv6,
        },
      ],
    },
  ];
  const answers = await inquirer.prompt(questions);
  if (!answers.alias.length) {
    delete answers.alias;
  }
  return answers;
};

// 根据参数返回对应带宽问询
const getBandwidthQuestions = (
  type?: BandwidthShareType,
  eipChargeMode?: ChargeMode
) => {
  const isSharedBandwith = type === BandwidthShareTypes.WHOLE;
  const isPrePaid = eipChargeMode === ChargeModes.prePaid;
  const name = `${isSharedBandwith ? '共享' : ''}带宽`;
  const nameMsg = `请输入${name}名称`;
  const sizeMsg = `请输入${name}大小`;
  const minSize = isSharedBandwith ? 5 : 1;
  const maxSize = 2000;
  const questions: Array<any> = [
    {
      type: 'input',
      name: 'name',
      message: `${nameMsg}（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点））`,
      replace: nameMsg,
      validate: (str: string) => {
        return EipValidator.validateName(str, '带宽名称');
      },
    },
    {
      type: 'input',
      name: 'size',
      message: `${sizeMsg}（带宽范围：${minSize}-2,000 Mbit/s）`,
      default: minSize,
      replace: sizeMsg,
      validate: (val: string) => {
        return EipValidator.validateNumRange(val, minSize, maxSize);
      },
    },
  ];
  const bandwithChargeModeQuestions = [
    {
      type: 'list',
      name: 'charge_mode',
      message: '请选择带宽计费模式',
      choices: [
        {
          name: '按带宽计费',
          value: BandwidthChargeModes.bandwidth,
        },
        {
          name: '按流量计费',
          value: BandwidthChargeModes.traffic,
        },
      ],
    },
  ];

  // 共享带宽或 Eip 包年/包月付费模式不能选择按流量计费
  if (!isSharedBandwith && !isPrePaid) {
    questions.push(...bandwithChargeModeQuestions);
  }

  return questions;
};

// 选择或创建一个共享带宽
const getSharedBandwidthPrompt = async () => {
  const { bandwidths } = await queryBandwidthList({
    share_type: BandwidthShareTypes.WHOLE,
  });
  let useExisted = false;

  if (bandwidths.length) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useExisted',
        message: `当前有 ${chalk.yellow(
          bandwidths.length
        )} 个可用共享带宽, 是否使用已有共享带宽`,
        default: true,
      },
    ]);
    useExisted = answers.useExisted;
  }

  if (useExisted) {
    // 选择已购买的共享带宽
    const { bandwidth } = await inquirer.prompt([
      {
        type: 'table',
        name: 'bandwidth',
        message: '请选择共享带宽',
        colWidths: [10, 40, 20, 20],
        displayAnswer: (data) => `${data.name}(${data.id})`,
        rows: bandwidths,
        columns: [
          {
            name: '序号',
            align: 'center',
            isOrder: true,
          },
          {
            name: 'ID',
            dataKey: 'id',
          },
          {
            name: '名称',
            dataKey: 'name',
          },
          {
            name: '带宽(Mbit/s)',
            align: 'center',
            dataKey: 'size',
          },
        ],
      },
    ]);

    return bandwidth;
  }

  // 购买新的共享带宽
  const questions = getBandwidthQuestions(BandwidthShareTypes.WHOLE);
  const answers = await inquirer.prompt(questions);
  const { bandwidth } = await createSharedBandwidth(answers);
  log.success(`购买 ${bandwidth.name} 带宽成功`);

  return bandwidth;
};

// 问询带宽选项
const getBandwidthPrompt = async (eipChargeMode: ChargeMode) => {
  const shareTypeQuestion = [
    {
      type: 'list',
      name: 'share_type',
      message: '请选择带宽类型',
      choices: [
        {
          name: '独占带宽',
          value: BandwidthShareTypes.PER,
        },
        {
          name: '共享带宽',
          value: BandwidthShareTypes.WHOLE,
        },
      ],
    },
  ];
  let answers = await inquirer.prompt(shareTypeQuestion);
  const isSharedBandwith = answers.share_type === BandwidthShareTypes.WHOLE;

  if (isSharedBandwith) {
    // 选择已有共享带宽或创建新的共享带宽
    const { id } = await getSharedBandwidthPrompt();

    answers = {
      id,
      ...answers,
    };
  } else {
    // 独占带宽
    const bandwidthQuestions = getBandwidthQuestions(
      BandwidthShareTypes.PER,
      eipChargeMode
    );

    answers = await inquirer.prompt(bandwidthQuestions, {
      charge_mode: BandwidthChargeModes.bandwidth,
      ...answers,
    });
  }

  return answers;
};

const syncEip = async () => {
  const publicip = await queryEipList();
  setHwcExports('hwcConfig.eipList', { publicip });
};

// 创建 Eip 服务
export const createEip = async () => {
  console.log(
    chalk.yellow(fmtDashTitle(`开始${commandName}, 请按下面提示进行操作`))
  );

  try {
    const publicip = await getEipPrompt();
    const extendParam = await getChargePrompt();
    const { charge_mode: eipChargeMode } = extendParam;
    const bandwidth = await getBandwidthPrompt(eipChargeMode);
    const res = await createEipService({
      publicip,
      bandwidth,
      extendParam,
    });

    await syncEip();
    log.success(`${commandName}成功`);

    return res;
  } catch (err) {
    log.error(`${commandName}失败：${err}`);
  }
};
