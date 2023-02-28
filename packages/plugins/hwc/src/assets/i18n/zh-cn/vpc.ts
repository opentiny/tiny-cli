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
export const vpcMsg = {
  vpcTerm: '虚拟私有云',
  vpcTermName: '虚拟私有云名称',
  vpcTermBeginCreateVpcMsg: '开始创建虚拟私有云, 请按下面提示进行操作',
  vpcTermBeginAddVpcMsg: '开始同步线上虚拟私有云',
  vpcTermGetVpcsListErrMsg: '更新虚拟私有云列表错误',
  vpcTermNameRule:
    '（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点），并且同一个租户下的名称不能重复）',
  vpcTermNameInputMsg: '请输入虚拟私有云名称',
  vpcTermNameCidrMsg: '请选择虚拟私有云下可用子网的范围：',
  vpcTermMaskMsg: (rangeMsg) => `请输入网段的掩码（${rangeMsg}）：`,
  vpcTermCreateVpcSuccessMsg: '虚拟私有云创建成功！',
  subnetTermNameRule:
    '（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点））',
  subnetTermNameInputMsg: '请输入子网名称',
  subnetTermMaskMsg: (min) => `请输入子网网段的掩码（取值范围：${min}-28）：`,
  subnetTermCreateVpcSuccessMsg: '子网创建成功！',
  vpcTermCreateBucketRulerValid:
    '只能由中文、英文字母、数字、下划线、中划线、点组成。',
  maskTermName: '网段的掩码',
  maskTermCreateBucketRulerValid: '此项仅支持数字。',
  maskRangeMsg: (range) => `取值范围：${range}`,
};
