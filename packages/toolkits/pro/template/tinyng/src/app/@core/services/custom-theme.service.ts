import { TiTheme } from '@opentiny/ng';
import { ThemeAddrPrefix, ThemeType } from 'src/app/@shared/models/theme';
import { CustomStyle, textWhiteStyle } from '@config/tiny-pro';

export class CustomThemeService {
  changeCustomTheme(color: string, isDark: boolean) {
    if (isDark) {
      setTimeout(() => {
        TiTheme.loadCss(`${ThemeAddrPrefix}/tiny-dark-theme.css`, 'tiny3theme');
      });
    } else {
      TiTheme.loadCss(`${ThemeAddrPrefix}/tiny-hws-theme.css`, 'tiny3theme');
    }

    for (const style of CustomStyle) {
      document.documentElement.style.setProperty(style, color);
      document.body.style.setProperty('--ti-leftmenu-item-selected-border-left-color', 'red');
    }

    // 自定义主题下显示字体颜色设置为#fff
    for (const style of textWhiteStyle) {
      document.documentElement.style.setProperty(style, '#fff');
    }

    localStorage.setItem('t-pro-theme', JSON.stringify({ id: ThemeType.Custom, custom: { brand: color, isDark } }));
  }
}
