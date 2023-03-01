import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HwcClient } from '@opentiny/hwc-client';
import hwcConfig from '../hwc-exports.json';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// 增加华为云相关配置
HwcClient.configure({
  ...hwcConfig.hwcConfig,
  accessKey: '',
  secretKey: '',
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
