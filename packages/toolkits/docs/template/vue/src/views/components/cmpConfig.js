import {$split } from '@/tools';
// 从npm 仓库的位置，引入所有md. 统一用文件名做key
const allMD = Object.create(null);
const mds = import.meta.globEager('@demos/app/**/*.md');
for (const path in mds) {
  if (Object.prototype.hasOwnProperty.call(mds, path)) {
    let key = $split(path, '/', -1);
    allMD[key] = mds[path].default;
  }
}

const allJson = Object.create(null);
const jsons = import.meta.globEager('@demos/app/**/*.js');
for (const path in jsons) {
  if (Object.prototype.hasOwnProperty.call(jsons, path)) {
    const key = $split(path, '/', -1).slice(0, -3);
    allJson[key] = jsons[path].default;
  }
}

const allSource = Object.create(null);
const srcs = import.meta.globEager('@demos/app/**', { as: 'raw' });
for (const path in srcs) {
  if (Object.prototype.hasOwnProperty.call(srcs, path)) {
    const cmpId = $split(path, '/', -2);
    const key = $split(path, '/', -1);
    allSource[`${cmpId}/${key}`] = srcs[path];
  }
}

// 批量导入vue组件示例文件, 进行vue组件示例的渲染
const vueFiles = import.meta.globEager('@demos/app/**/*.vue');
const vueComponents = Object.create(null);
for(const path in vueFiles) {
  const cmpId = $split(path, '/', -2);
  const key = $split(path, '/', -1);
  vueComponents[`${cmpId}/${key}`] = vueFiles[path].default;
}

const languageMap = {
  js: 'javascript',
  ts: 'javascript',
  html: 'html',
  vue: 'html',
  css: 'css',
  less: 'css',
  scss: 'css',
  sass: 'css',
};

const textColor = '#5073e5';
const borderColor = '#d9dbdd';
const themeOverrides = {
  Tabs: {
    tabTextColorActiveLine: textColor,
    tabTextColorHoverLine: textColor,
    barColor: textColor,
    tabBorderColor: borderColor,
  },
};

export { allMD, allJson, allSource, languageMap, themeOverrides, vueComponents };
