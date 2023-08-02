import { Injectable } from '@angular/core';
import { TiTheme } from '@opentiny/ng';
import { TinyThemeConfigItems, DefaultTheme, ThemeAddrPrefix, ThemeType } from 'src/app/@shared/models/theme';
import { CustomStyle } from '@config/tiny-pro';
import { CustomThemeService } from './custom-theme.service';

@Injectable()
export class PersonalizeService {
  configs: any[] = [
    {
      name: 'themes',
      icon: 'icon-color',
      items: [],
    },
  ];

  constructor(private customThemeService: CustomThemeService) {}

  initTheme(): void {
    // 添加Tiny相关主题
    this.addTinyTheme();

    // 主题设置
    const theme = localStorage.getItem('t-pro-theme') ? JSON.parse(localStorage.getItem('t-pro-theme')!) : DefaultTheme;

    if (theme.id === DefaultTheme.id) {
      this.setDefaultThemeStorage(theme);
      return;
    }

    // 添加setTimeout原因：页面link的样式会比import加载快
    // 因此loadCss加载的样式会被覆盖，添加setTimeout延迟执行
    if (theme.id === ThemeType.Custom) {
      const { brand, isDark } = theme.custom;
      this.customThemeService.changeCustomTheme(brand, isDark);
    } else {
      setTimeout(() => {
        TiTheme.loadCss(`${ThemeAddrPrefix}/${theme.id}.css`, 'tiny3theme');
      });
    }
  }

  addTinyTheme() {
    const items: any = [];
    items.push(...TinyThemeConfigItems);
    this.configs[0].items = items;
  }

  setDefaultThemeStorage(theme: any) {
    // 判断localstory的custom属性是否存在
    if (theme.custom) return;

    // 不存在custom属性需要保存之前设置过的主题相关配置
    theme.custom = {
      brand: DefaultTheme.brand,
      isDark: DefaultTheme.isDark,
    };

    localStorage.setItem(
      't-pro-theme',
      JSON.stringify({
        id: theme.id,
        custom: {
          brand: DefaultTheme.brand,
          isDark: DefaultTheme.isDark,
        },
      })
    );
  }

  changeTheme(themeId: string) {
    // 移除自定义相关的样式
    for (const style of CustomStyle) {
      document.documentElement.style.setProperty(style, '');
      document.body.style.setProperty('--ti-leftmenu-item-selected-border-left-color', '');
    }

    const theme = localStorage.getItem('t-pro-theme') ? JSON.parse(localStorage.getItem('t-pro-theme')!) : DefaultTheme;

    // 需要保存之前设置过的自定义主题相关配置
    this.setDefaultThemeStorage(theme);

    if (themeId === ThemeType.Custom) {
      const { brand, isDark } = theme.custom;
      this.customThemeService.changeCustomTheme(brand, isDark);
    } else {
      TiTheme.loadCss(`${ThemeAddrPrefix}/${themeId}.css`, 'tiny3theme');
    }

    const { brand, isDark } = theme.custom;
    localStorage.setItem('t-pro-theme', JSON.stringify({ id: themeId, custom: { brand, isDark } }));
  }
}
