export enum ThemeType {
  Default = 'tiny-hws-theme',
  Pink = 'tiny-sweet-theme',
  Orange = 'tiny-pink-light-theme',
  Purple = 'tiny-provence-theme',
  Deep = 'tiny-deep-theme',
  Dark = 'tiny-dark-theme',
  Custom = 'tiny-customize-theme',
}

export const TinyThemeConfigItems = [
  {
    cnName: '默认主题',
    id: 'tiny-hws-theme',
    isDark: undefined,
    name: '默认主题',
  },
  {
    cnName: '蜜糖主题',
    id: 'tiny-sweet-theme',
    isDark: undefined,
    name: '蜜糖主题',
  },
  {
    cnName: '紫罗兰主题',
    id: 'tiny-provence-theme',
    isDark: undefined,
    name: '紫罗兰主题',
  },
  {
    cnName: '深邃夜空主题',
    id: 'tiny-deep-theme',
    isDark: undefined,
    name: '深邃夜空主题',
  },
  {
    cnName: '深色主题',
    id: 'tiny-dark-theme',
    isDark: true,
    name: '深色主题',
  },
  {
    cnName: '自定义主题',
    id: 'tiny-customize-theme',
    isDark: false,
    name: '自定义主题',
  },
];

export const ThemeColors = [
  {
    name: 'Light',
    isDark: false,
    colors: [
      '#343a40',
      '#24316c',
      '#673AB7',
      '#4f7dff',
      '#4caf78',
      '#5faa15',
      '#ff6a0d',
      '#f36b7f',
    ],
  },
  {
    name: 'Dark',
    isDark: true,
    colors: [
      '#343a40',
      '#24316c',
      '#673AB7',
      '#4f7dff',
      '#4caf78',
      '#5faa15',
      '#ff6a0d',
      '#f36b7f',
    ],
  },
];

export const DefaultTheme = {
  id: 'tiny-hws-theme',
  brand: '#343a40',
  isDark: false,
  custome: {},
};

export const ThemeAddrPrefix = 'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/tinyUI-admin/theme';
