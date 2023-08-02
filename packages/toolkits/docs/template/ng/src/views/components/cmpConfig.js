const languageMap = {
  js: 'javascript',
  ts: 'javascript',
  html: 'html',
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

// 只有select组件需要select.faq.cn.md
const faqMdConfig = {
  select: true,
};

export { languageMap, themeOverrides, faqMdConfig };
