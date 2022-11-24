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
import test from 'ava';

// 基于ava的单元测试 demo文件，单元测试文件以 .spec.ts 结尾

function demoTest(value:string){
  // tslint:disable-next-line: prefer-template
  return value + '1';
}

// 简单的单元测试例子
test('# demo test', t => {
  const name = demoTest('abc-def');
  t.is('abc-def1', name);
})