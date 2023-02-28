import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './services/auth.service';
import { MockDataModule } from './mock/mock-data.module';
import { PersonalizeService } from './services/personalize.service';
import { AuthGuardService } from './services/auth-guard-service.guard';
import { CustomThemeService } from './services/custom-theme.service';
import { ObsService } from './services/obs.service';
import { ContractsService } from './services/contracts.service';
import { NoticeData } from './data/noticeData';
import { NoticeDataService } from './mock/notice-data.service';

const DATA_SERVICES = [{ provide: NoticeData, useClass: NoticeDataService }];

export const TINYUI_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers!,
  ...DATA_SERVICES,
  AuthService,
  PersonalizeService,
  AuthGuardService,
  CustomThemeService,
  ObsService,
  ContractsService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...TINYUI_CORE_PROVIDERS],
    };
  }
}
