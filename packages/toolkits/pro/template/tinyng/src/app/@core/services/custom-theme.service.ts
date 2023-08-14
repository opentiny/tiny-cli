import { TiTheme } from '@opentiny/ng';
import { ThemeAddrPrefix, ThemeType } from 'src/app/@shared/models/theme';
import { CustomStyle, textWhiteStyle } from '@config/tiny-pro';

export class CustomThemeService {
  changeCustomTheme(color: string, isDark: boolean, themeId:any) {
    if (isDark) {
      setTimeout(() => {
        TiTheme.loadCss(
          `${ThemeAddrPrefix}/${themeId}.css`,
          'tiny3theme'
        );
      });
    } else {
      // 加载默认主题不传入路径避免报错
      TiTheme.loadCss('', 'tiny3theme');
    }
    // 自定义主题下显示字体颜色设置为#fff
    for (const style of textWhiteStyle) {
      document.documentElement.style.setProperty(style, '#fff');
    }

    localStorage.setItem('t-pro-theme', JSON.stringify({ id: ThemeType.Custom, custom: { brand: color, isDark } }));
  }
}
