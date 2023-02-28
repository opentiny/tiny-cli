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