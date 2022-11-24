/**
 * Copyright (c) 2022 - present OpentinyCli Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import * as path from 'path';
import { logs, fs, git, modules } from '@opentiny/cli-devkit';
import axios from 'axios';
import inquirer, { Answer } from 'inquirer';

const log = logs('tiny-toolkit-dev');
const cwd = process.cwd();

/**
 * 当前版本是否已发布过
 * @param name 模块名称
 * @param version 模块版本
 * @returns bool
 */
export async function existsVersion(name: string, version: string) {
  const url = `http://szg1.artifactory.inhuawei.com/artifactory/api/npm/npm-cbcbigate/${encodeURIComponent(
    name
  )}/${version}`;
  log.debug('check module has =%s', url);
  try {
    const res: any = await axios.head(url);
    return !/4\d\d/.test(res.status);
  } catch (e) {
    return false;
  }
}

/**
 * 校验changelog信息
 */
function validChangeLog(pkg: any): boolean {
  let matchVersionLog = false;
  // 是否填写了 changeLog
  if (!pkg.changeLog) {
    log.error('package.json 无 changeLog 字段');
    return false;
  }

  if (!Array.isArray(pkg.changeLog)) {
    log.error(
      'package.json 无 changeLog 必须为数组类型,如: [{"version":"x.x.x","log":["msg1","msg2"]}]'
    );
    return false;
  }

  for (let i = 0; i < pkg.changeLog.length; i += 1) {
    if (pkg.changeLog[i].version === pkg.version) {
      if (
        !Array.isArray(pkg.changeLog[i].log) ||
        pkg.changeLog[i].log.length === 0
      ) {
        log.error(`changeLog[${i}].log 不是数组,或长度为0`);
        return false;
      }
      matchVersionLog = true;
    }
  }
  if (!matchVersionLog) {
    log.error(`未填写 ${pkg.version} 对应的更新日志`);
    return false;
  }

  return true;
}

export default async function() {
  const readmePath = path.join(cwd, 'README.md');

  let pkg;
  let message: string = '';
  // 验证package.json的存在
  try {
    pkg = require(path.resolve(cwd, 'package.json'));
  } catch (err) {
    log.error('读取 package.json 有误，请确认');
    log.error(' - 是否插件/套件 工程根目录里面执行此命令');
    log.error(' - package.json 中是否有语法错误');
    return false;
  }

  // 如果有.git 就提交git
  if (!fs.existsSync(path.resolve(cwd, '.git'))) {
    log.error(
      '您尚未新建gitlab仓库, 请在 http://git.huawei.com/tiny 上新建对应的仓库'
    );
    log.error('请执行 $ git init 后关联线上的gitlab仓库');
    return false;
  }

  // 同步一下版本号
  const gitVersion = git.syncVersion();
  if (gitVersion) {
    log.success(
      `将当前分支版本号 ${gitVersion} 同步至 package.json 文件的 version 字段`
    );
  }

  // 验证是否有 readme.md 文件
  if (!fs.existsSync(readmePath)) {
    log.error('缺少 README.md 文件(注意文件名大小写)');
    return false;
  }

  // 是否有填写版本号
  if (!pkg.version) {
    log.error('package.json 中 version 字段未填写');
    return false;
  }

  // 是否有填写描述信息
  if (!pkg.description) {
    log.error(
      'package.json 中 description 字段未填写，请用一句话简单貌似该模块的功能'
    );
    return false;
  }

  if (!(pkg.tinyOption && pkg.tinyOption && pkg.tinyOption.chName)) {
    log.error('package.json 中 tinyOption.chName 字段请填写该模块的中文名称');
  }

  // 是否有changelog
  const vlog = validChangeLog(pkg);
  if (!vlog) return false;

  // check 当前version是否已发布过
  const exists = await existsVersion(pkg.name, pkg.version);
  if (exists) {
    log.error(
      `当前模块 ${pkg.name}的 ${pkg.version} 版本已发布过，请切到新的版本再发布!`
    );
    return false;
  }

  const version = pkg.version.split('.');
  const tinyNpm = await modules.get('@cloud/tiny-plugin-npm');
  // 版本号提示判断
  if (parseInt(version[2], 10) === 0) {
    tinyNpm.publish();
    return true;
  }

  // 发布提示
  if (parseInt(version[2], 10) === 1) {
    message = `当前发布的版本是 ${
      pkg.version
    } ,请确保向下兼容 ${`${version[0]}.${version[1]}.0`} , 确认兼容请输入(y)继续操作`;
  } else {
    message = `当前发布的版本是 ${
      pkg.version
    } ,请确保向下兼容 ${`${version[0]}.${version[1]}.0`} ~ ${`${version[0]}.${
      version[1]
    }.${parseInt(version[2], 10) - 1}`} , 确认兼容请输入(y)继续操作`;
  }
  // 发布时,提示一下当前版本
  const answers: Answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'check',
      // tslint:disable-next-line: object-shorthand-properties-first
      message
    }
  ]);

  if (answers.check === 'y' || answers.check === 'Y') {
    tinyNpm.publish();
  }

  return true;
}
