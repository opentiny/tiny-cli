const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// tiny3 �� ui-ng �� npm ���о�̬��Դ�ļ��в��죬�Ƚ������
const baseDir = process.cwd();
const toRemovefiles = [path.resolve(baseDir, './public/@demos')];

toRemovefiles.forEach(file => {
  if (fs.pathExistsSync(file)) {
    fs.removeSync(file);
  }
});

const copyfiles = [
  {
    // ���ʾ��Դ�롢�������markdown�����ʾ������
    source: 'demos',
    target: './public/@demos',
  },
];

// ���ݴ���Ĳ�����ͬ��������Ӧ���ļ�
copyfiles.forEach(path => {
  try {
    fs.copySync(path.source, path.target);
    console.log(chalk.green(path.source + ' ������ɣ�'));
  } catch (err) {
    console.log(chalk.red(err));
  }
});
