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
    name: 'personalize.tiny-hws-theme',
    feature: 'personalize.tiny-hws-theme-feature',
    show: 'linear-gradient(225deg,#97b3f2 1%, #5e7ce0)'
  },
  {
    cnName: '蜜糖主题',
    id: 'tiny-sweet-theme',
    isDark: undefined,
    name: 'personalize.tiny-sweet-theme',
    feature: 'personalize.tiny-sweet-theme-feature',
    show: 'linear-gradient(229deg,#f79fd5, #ed66ab 94%)'
  },
  {
    cnName: '紫罗兰主题',
    id: 'tiny-provence-theme',
    isDark: undefined,
    name: 'personalize.tiny-provence-theme',
    feature: 'personalize.tiny-provence-theme-feature',
    show: 'linear-gradient(225deg,#b3a3f8, #7c6aee)'
  },
  {
    cnName: '深邃夜空主题',
    id: 'tiny-deep-theme',
    isDark: undefined,
    name: 'personalize.tiny-deep-theme',
    feature: 'personalize.tiny-deep-theme-feature',
    show: 'linear-gradient(228deg,#4a566c, #242b3a 96%)'
  },
  {
    cnName: '深色主题',
    id: 'tiny-dark-theme',
    isDark: true,
    name: 'personalize.tiny-dark-theme',
    feature: 'personalize.tiny-dark-theme-feature',
    show: 'linear-gradient(228deg,#464747 5%, #000000)'
  }
];
export const LightTheme = [
  {
    id: 'tiny-light-theme-1',
    color : '#343a40',
  },
  {
    id: 'tiny-light-theme-2',
    color : '#25316C',
  },
  {
    id: 'tiny-light-theme-3',
    color : '#673AB7',
  },
  {
    id: 'tiny-light-theme-4',
    color : '#4f7dff',
  },
  {
    id: 'tiny-light-theme-5',
    color : '#4DAF77',
  },
  {
    id: 'tiny-light-theme-6',
    color : '#5faa15',
  },
  {
    id: 'tiny-light-theme-7',
    color : '#FF6A0B',
  },
  {
    id: 'tiny-light-theme-8',
    color : '#F36B7F',
  }
]

export const ThemeDarkColor = [
  {
    id: 'tiny-dark-theme',
    color : '#343a40',
  },
  {
    id: 'tiny-dark-theme-1',
    color : '#25316C',
  },
  {
    id: 'tiny-dark-theme-2',
    color : '#673AB7',
  },
  {
    id: 'tiny-dark-theme-3',
    color : '#4f7dff',
  },
  {
    id: 'tiny-dark-theme-4',
    color : '#4DAF77',
  },
  {
    id: 'tiny-dark-theme-5',
    color : '#5faa15',
  },
  {
    id: 'tiny-dark-theme-6',
    color : '#FF6A0B',
  },
  {
    id: 'tiny-dark-theme-7',
    color : '#F36B7F',
  },
]

export const ThemeColors = [
  {
    name: 'Dark',
    title: 'personalize.tiny-dark-theme',
    isDark: true,
    colors: [
      '#343a40',
      '#24316c',
      '#292332',
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

export const ThemeAddrPrefix = '/assets/styles/theme';
