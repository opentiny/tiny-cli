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
export const obsMsg = {
  obsTermBeginCreateMsg: '开始创建桶, 请按下面提示进行操作',
  obsTermBeginAddMsg: '开始同步线上桶',
  obsTermBucket: '桶',
  obsTermName: '桶名称',
  obsTermNameMsg:
    '（长度3-63，数字或字母开头，支持小写字母、数字、“-”、“.”。禁止使用类IP地址；禁止以“-”或“.”开头及结尾；禁止两个“.”相邻，如：“my..bucket”；禁止“.”和“-”相邻，如：“my-.bucket”和“my.-bucket”）',
  obsTermInputbucketName: '请输入桶名称',
  obsTermCreateBucketRuler1Valid:
    '仅支持小写字母、数字、中划线（-）、英文句号（.）。',
  obsTermCreateBucketRuler2Valid: '禁止使用IP地址。',
  obsTermCreateBucketRuler3Valid:
    '禁止以中划线（-）或英文句号（.）开头及结尾。',
  obsTermCreateBucketRuler4Valid:
    '禁止两个英文句号（.）相邻（如"my..bucket"）。',
  obsTermCreateBucketRuler5Valid:
    '禁止中划线（-）和英文句号（.）相邻（如"my-.bucket"和"my.-bucket"）。',
  obsTermGetListErrMsg: '更新桶列表失败',
  obsTermCreateSuccessMsg: '创建桶成功！',
  obsTermCreateErrMsg: '创建桶失败',
  obsTermheadBucketErrMsg: '判断桶是否存在出现错误：',
};
