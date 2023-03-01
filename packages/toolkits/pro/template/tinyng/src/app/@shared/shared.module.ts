import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
// 导入Tiny3模块
import {
  TiAccordionModule,
  TiActionmenuModule,
  TiAlertModule,
  TiAutocompleteModule,
  TiButtongroupModule,
  TiButtonModule,
  TiCheckboxModule,
  TiCollapseModule,
  TiDateModule,
  TiDateRangeModule,
  TiDatetimeModule,
  TiDatetimeRangeModule,
  TiFormfieldModule,
  TiIconModule,
  TiInputNumberModule,
  TiIntroServiceModule,
  TiIpModule,
  TiIpsectionModule,
  TiLeftmenuModule,
  TiLoadingModule,
  TiMenuModule,
  TiMessageModule,
  TiModalModule,
  TiOverflowModule,
  TiPaginationModule,
  TiProgressbarModule,
  TiPopconfirmModule,
  TiRadioModule,
  TiSearchboxModule,
  TiSelectModule,
  TiSliderModule,
  TiSpinnerModule,
  TiStepsModule,
  TiSwitchModule,
  TiTableModule,
  TiTabModule,
  TiTagsInputModule,
  TiTextareaModule,
  TiTextModule,
  TiTimeModule,
  TiTipModule,
  TiTreeModule,
  TiTreeselectModule,
  TiUploadModule,
  TiValidationModule,
  TiHalfmodalModule
} from '@opentiny/ng';

import {
  TProBaseTagsModule,
  TProBaseGridModule,
  TProBaseLayoutModule,
  TProBaseBackTopModule,
  TProBaseAvatarModule,
  TProBaseBadgeModule,
  TProBaseProgressModule,
  TProBaseDropDownModule,
  TProBaseWindowRefModule
} from './modules';
import {
  PersonalizeConfigComponent,
  MultiSettingsComponent,
  HeaderCollapsedButtonComponent,
  HeaderComponent,
  HeaderLeftMenuComponent,
  FooterComponent,
  LoginComponent,
  SideSettingsComponent,
  PersonalizeComponent,
  HeaderOperationComponent,
  NavbarComponent,
  HeaderLogoComponent,
  SideMenuComponent,
  RegisterComponent,
  HeaderNoticeComponent,
  HelpTipComponent
} from './components';

import { TProTranslatePipe } from './locale/t-pro-translate.pipe';

const COMPONENTS = [
  FooterComponent,
  HeaderOperationComponent,
  HeaderLogoComponent,
  HeaderNoticeComponent,
  HeaderLeftMenuComponent,
  HeaderCollapsedButtonComponent,
  HeaderComponent,
  LoginComponent,
  MultiSettingsComponent,
  NavbarComponent,
  PersonalizeComponent,
  PersonalizeConfigComponent,
  RegisterComponent,
  SideMenuComponent,
  SideSettingsComponent,
  HelpTipComponent
];

// 引入Tiny3相关module
const TINY_MODULES = [
  TiButtonModule,
  TiButtongroupModule,
  TiRadioModule,
  TiCheckboxModule,
  TiSelectModule,
  TiSliderModule,
  TiSpinnerModule,
  TiSwitchModule,
  TiTreeselectModule,
  TiTextModule,
  TiTextareaModule,
  TiAutocompleteModule,
  TiSearchboxModule,
  TiIconModule,
  TiIpModule,
  TiIpsectionModule,
  TiTagsInputModule,
  TiInputNumberModule,
  TiDateModule,
  TiDateRangeModule,
  TiDatetimeModule,
  TiDatetimeRangeModule,
  TiTimeModule,
  TiValidationModule,
  TiFormfieldModule,
  TiUploadModule,
  TiMenuModule,
  TiActionmenuModule,
  TiLeftmenuModule,
  TiAccordionModule,
  TiTabModule,
  TiStepsModule,
  TiAlertModule,
  TiMessageModule,
  TiModalModule,
  TiPopconfirmModule,
  TiTipModule,
  TiOverflowModule,
  TiCollapseModule,
  TiTableModule,
  TiPaginationModule,
  TiTreeModule,
  TiProgressbarModule,
  TiIntroServiceModule,
  TiLoadingModule,
  TiIconModule,
  TiHalfmodalModule
];

const PIPES = [TProTranslatePipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ClipboardModule,
    TProBaseBackTopModule,
    TProBaseAvatarModule,
    TProBaseBadgeModule,
    TProBaseProgressModule,
    TProBaseDropDownModule,
    TProBaseWindowRefModule,
    TProBaseLayoutModule,
    TProBaseGridModule,
    TProBaseTagsModule,
    ...TINY_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuComponent,
    TranslateModule,
    HeaderLogoComponent,
    HeaderOperationComponent,
    TProBaseBackTopModule,
    TProBaseAvatarModule,
    TProBaseBadgeModule,
    TProBaseProgressModule,
    TProBaseDropDownModule,
    TProBaseWindowRefModule,
    TProBaseLayoutModule,
    TProBaseGridModule,
    TProBaseTagsModule,
    ...TINY_MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [...PIPES]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
