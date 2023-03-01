import chalk from 'chalk';
import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';

import {
  getTinyProConfigure,
  CONSTANTS,
  fmtDashTitle,
  inquirer,
  ErrorUtils,
} from '../../../core';
import {
  getEipQuestions,
  getMysqlQuestions,
  getUnbindQuestions,
} from '../questions';
import {
  attachEip,
  queryInstances,
  unbindEip,
} from '../services/mysql-services';
import { queryEipList } from '../../hwc-eip/services/eip-services';
import { createEip } from '../../hwc-eip/commands/create';
import { EipInfo } from '../../hwc.types';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-mysql`
);

export const commandName = '数据库实例绑定EIP/解绑EIP';

async function promptMysql(currAns) {
  const cliConfig = getTinyProConfigure();
  const mysqls = await queryInstances(cliConfig);
  const quest = getMysqlQuestions(mysqls);

  const ans = await inquirer.prompt(quest, currAns);

  // 判断是否需要解绑
  const selectInstance = mysqls.find((mysql) => mysql.id === ans.instance_id);
  if (selectInstance.public_ips.length > 0) {
    ans.public_ips = selectInstance.public_ips;
  }

  return ans;
}

// 询问解绑
async function promptUnbind(currAns) {
  const ans: any = { ...currAns };
  const quest = getUnbindQuestions();

  return inquirer.prompt(quest, ans);
}

// 创建新EIP
async function useCreateEip(currAns) {
  const result: EipInfo = (await createEip()).publicip;
  const ans = { ...currAns };
  ans.public_ip = result.public_ip_address;
  ans.public_ip_id = result.id;

  return ans;
}

async function promptEip(currAns) {
  let ans: any = { ...currAns };

  process.stdin.pause();
  let eips = (await queryEipList()).publicips;
  eips = eips.filter((e) => e.status === 'DOWN'); // 未被绑定过的EIP
  process.stdin.resume();

  if (eips.length > 0) {
    const quest = getEipQuestions(eips);
    ans = await inquirer.prompt(quest, ans);
    if (ans.useExistEip) {
      const eip = eips.find((e) => e.id === ans.eip_id);
      ans.public_ip = eip.public_ip_address;
      ans.public_ip_id = eip.id;

      return ans;
    }
    return useCreateEip(ans);
  }
  ans.useExistEip = false;
  return useCreateEip(ans);
}

// 绑定
async function bindEiptoMysql(currAns) {
  const cliConfig = getTinyProConfigure();
  await attachEip(currAns, cliConfig);
}
// 解绑
async function unbindEipFromMysql(currAns) {
  const cliConfig = getTinyProConfigure();
  await unbindEip(currAns, cliConfig);
}

export default async () => {
  console.log(
    chalk.yellow(fmtDashTitle(`开始为${commandName}, 请按下面提示进行操作`))
  );

  try {
    let ans: any = {};

    ans = await promptMysql(ans);
    if (ans.public_ips) {
      ans = await promptUnbind(ans);
      if (ans.mode === 'unbind') {
        // 解绑
        await unbindEipFromMysql(ans);
        log.success(`数据库实例解绑成功`);
      } else {
        // 先解绑
        await unbindEipFromMysql(ans);
        ans = await promptEip(ans);
        await bindEiptoMysql(ans);
        log.success(`数据库实例更新Eip成功`);
      }
    } else {
      ans = await promptEip(ans);
      await bindEiptoMysql(ans);
      log.success(`${commandName}成功`);
    }
  } catch (err) {
    log.error(`${commandName}错误：${ErrorUtils.getErrorMessage(err)}`);
  }
};
