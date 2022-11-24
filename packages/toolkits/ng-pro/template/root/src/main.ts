import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HwcClient } from '@opentiny/hwc-client';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import config from '../hwc-exports.json';

if (environment.production) {
  enableProdMode();
}

// 增加华为云相关配置
HwcClient.configure({
  ...config.hwcConfig,
  accessKey: '',
  secretKey: ''
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
