const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// tiny3 和 ui-ng 的 npm 包中静态资源文件有差异，先进行清除
const baseDir = process.cwd();
const toRemovefiles = [path.resolve(baseDir, './public/assets'), path.resolve(baseDir, './tinyng/overviewimage')];

toRemovefiles.forEach(file => {
  if (fs.pathExistsSync(file)) {
    fs.removeSync(file);
  }
});

const copyfiles = [
  {
    source: 'node_modules/@huawei/tinydoc-ng-images/images/overviewimage',
    target: './tinyng/overviewimage',
  },
  {
    source: 'node_modules/@huawei/tinydoc-ng-tiny/scripts/assets',
    target: `./public/assets`,
  },
];

// 根据传入的参数，同步拷贝相应的文件
copyfiles.forEach(path => {
  try {
    fs.copySync(path.source, path.target);
    console.log(chalk.green(path.source + ' 拷贝完成！'));
  } catch (err) {
    console.log(chalk.red(err));
  }
});
