#! /usr/bin/env node
const fs = require('fs');
const vm = require('vm');
const m = require('module');
const readFileSync = fs.readFileSync;
const writeFileSync = fs.writeFileSync;
const Script = vm.Script;
const wrap = m.wrap;
const source = readFileSync(__dirname + '/dist/index.js.cache.js', 'utf-8');
const cachedData =
  !process.pkg && require('process').platform !== 'win32' && readFileSync(__dirname + '/dist/index.js.cache');
const script = new Script(wrap(source), cachedData ? { cachedData } : {});
script.runInThisContext()(exports, require, module, __filename, __dirname);
// 移除发送请求时报warn，参考自:https://github.com/nodejs/node/issues/10802#issuecomment-616728458
process.removeAllListeners('warning');
if (cachedData)
  process.on('exit', () => {
    try {
      writeFileSync(__dirname + '/dist/index.js.cache', script.createCachedData());
    } catch (e) {}
  });
