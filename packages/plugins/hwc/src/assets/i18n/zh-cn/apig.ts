/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import chalk from 'chalk';

export const apigMsg = {
  groupTermBeginAddApigMsg: '开始同步线上API网关分组',
  groupTermGetGroupListErrMsg: '更新API网关分组列表错误',
  groupTermBeginCreateApigMsg: '开始创建API网关分组，请按下面提示进行操作',
  groupTermInputGroupName: '请输入分组的名称',
  groupTermNameMsg:
    '（长度3-255，以英文、汉字和数字开头，支持汉字、英文、数字、中划线、下划线、点、斜杠、中英文格式下的小括号和冒号、中文格式下的顿号）',
  groupTermCreateSuccessMsg: '创建API网关分组成功',
  groupTermCreateErrMsg: '创建API网关分组失败',
  groupTermBindDomainMsg: (groupName, domain) =>
    `请为分组 ${chalk.yellow(
      groupName
    )} 绑定独立域名来开放服务，也可以使用调试域名 ${chalk.yellow(
      domain
    )} 进行开发调试，每天最多访问1000次。`,
  groupTermBindDomainName: '是否绑定独立域名？',
  groupTermBindDomainNameErrMsg: '绑定独立域名失败',
  groupTermInputDomainName: '请输入域名',
  groupTermDomainNameMsg: '（长度1-64，并且符合域名规范）',
  groupTermBindDomainSuccessMsg: (domain) => `绑定域名 ${domain} 成功！`,
  groupTermBuyInstanceMsg:
    '请先购买API网关专享版实例：https://support.huaweicloud.com/usermanual-apig/apig_03_0037.html',
  groupTermSelectInstanceMsg: '请选择实例',
  groupTerm: '分组',
  groupTermName: '分组名称',
  groupTermDomainName: '域名',
  apigTermBeginAddApigMsg: '开始同步线上API列表',
  apigTermGetApigListErrMsg: '更新API列表错误',
  apigTermBeginPublishMsg: '开始发布API，请按下面提示进行操作',
  apigTermSelectPublishMsg: '请选择需要发布的API：',
  apigTermPublishSuccessMsg: (apiName) =>
    `已发布API ${chalk.yellow(apiName)} 到 RELEASE 环境上。`,
  apigTermPublishErrMsg: '发布API失败',
  apigTermName: '名称',
  apigTermRequestPath: '请求路径',
};
