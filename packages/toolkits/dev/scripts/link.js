const createSymlink = require('@lerna/create-symlink');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

// TODO
// 将开发中的devkit 链接到当前项目中
const devkitPath = path.join(__dirname,'../node_modules/@opentiny/cli-devkit');

const sourceDevKitPath = path.join(__dirname,'../../../packages/devkit')
if (fs.existsSync(devkitPath)) {
  rimraf.sync(devkitPath);
  console.log(`devkitPath = `, devkitPath, ' remove success!')
}
createSymlink(sourceDevKitPath, devkitPath, "junction")

console.log(sourceDevKitPath, ' link success!')