import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiLocale } from '@opentiny/ng'
import { DEFAULT_LANG, I18N_LANGUAGES } from '../config/language-config';
@Component({
  selector: 't-pro-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  currentLang = localStorage.getItem('lang') || window.navigator.language.toLowerCase() || DEFAULT_LANG;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(I18N_LANGUAGES);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(this.currentLang);
    TiLocale.setLocale(this.currentLang === 'zh-cn' ? TiLocale.ZH_CN : TiLocale.EN_US); // tiny3国际化
  }
}
