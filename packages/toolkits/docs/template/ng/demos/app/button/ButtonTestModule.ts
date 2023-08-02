import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiIconModule, TiTipModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ButtonColorComponent } from './ButtonColorComponent';
import { ButtonIconComponent } from './ButtonIconComponent';
import { ButtonSizeComponent } from './ButtonSizeComponent';
import { ButtonEventComponent } from './ButtonEventComponent';
import { ButtonDisabledComponent } from './ButtonDisabledComponent';
import { ButtonFocusComponent } from './ButtonFocusComponent';
import { ButtonOnlyiconComponent } from './ButtonOnlyiconComponent';
import { ButtonLoadingComponent } from './ButtonLoadingComponent';
import { ButtonHasborderComponent } from './ButtonHasborderComponent';
import { ButtonHasborderTestComponent } from './ButtonHasborderTestComponent';
import { ButtonTipComponent } from './ButtonTipComponent';
import { ButtonLabelComponent } from './ButtonLabelComponent';

@NgModule({
  imports: [CommonModule, TiButtonModule, TiIconModule, TiTipModule, DemoLogModule, RouterModule.forChild(ButtonTestModule.ROUTES)],
  declarations: [
    ButtonColorComponent,
    ButtonIconComponent,
    ButtonSizeComponent,
    ButtonDisabledComponent,
    ButtonEventComponent,
    ButtonFocusComponent,
    ButtonOnlyiconComponent,
    ButtonLoadingComponent,
    ButtonHasborderComponent,
    ButtonHasborderTestComponent,
    ButtonTipComponent,
    ButtonLabelComponent,
  ],
})
export class ButtonTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiButtonComponent.html', label: 'Button' }];
  static readonly ROUTES: Routes = [
    {
      path: 'button/button-color',
      component: ButtonColorComponent,
    },
    {
      path: 'button/button-size',
      component: ButtonSizeComponent,
    },
    {
      path: 'button/button-icon',
      component: ButtonIconComponent,
    },
    {
      path: 'button/button-hasborder',
      component: ButtonHasborderComponent,
    },
    {
      path: 'button/button-label',
      component: ButtonLabelComponent,
    },
    {
      path: 'button/button-disabled',
      component: ButtonDisabledComponent,
    },
    {
      path: 'button/button-event',
      component: ButtonEventComponent,
    },
    {
      path: 'button/button-focus',
      component: ButtonFocusComponent,
    },
    {
      path: 'button/button-onlyicon',
      component: ButtonOnlyiconComponent,
    },
    {
      path: 'button/button-loading',
      component: ButtonLoadingComponent,
    },
    {
      path: 'button/button-tip',
      component: ButtonTipComponent,
    },
    {
      path: 'button/button-hasborder-test',
      component: ButtonHasborderTestComponent,
    },
  ];
}
