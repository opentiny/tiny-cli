import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtongroupModule, TiIconModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ButtongroupItemsComponent } from './ButtongroupItemsComponent';
import { ButtongroupMultipleComponent } from './ButtongroupMultipleComponent';
import { ButtongroupReactiveFormsComponent } from './ButtongroupReactiveFormsComponent';
import { ButtongroupTemplateComponent } from './ButtongroupTemplateComponent';
import { ButtongroupSupComponent } from './ButtongroupSupComponent';
import { ButtongroupRadioTypeComponent } from './ButtongroupRadioTypeComponent';
import { ButtongroupMultiTypeComponent } from './ButtongroupMultiTypeComponent';
import { ButtongroupDeselectableComponent } from './ButtongroupDeselectableComponent';
import { ButtongroupMinwidthComponent } from './ButtongroupMinwidthComponent';
import { ButtongroupActiveclassComponent } from './ButtongroupActiveclassComponent';
import { ButtongroupItemsTestComponent } from './ButtongroupItemsTestComponent';
import { ButtongroupManyComponent } from './ButtongroupManyComponent';
import { ButtongroupTipComponent } from './ButtongroupTipComponent';
import { ButtongroupMultilineComponent } from './ButtongroupMultilineComponent';
import { ButtongroupDisabledComponent } from './ButtongroupDisabledComponent';
import { ButtongroupValuekeyComponent } from './ButtongroupValuekeyComponent';
import { ButtongroupValuekeyTestComponent } from './ButtongroupValuekeyTestComponent';
import { ButtongroupEnumComponent } from './ButtongroupEnumComponent';
import { ButtongroupEventComponent } from './ButtongroupEventComponent';
import { ButtongroupFocusComponent } from './ButtongroupFocusComponent';
import { ButtongroupSupTestComponent } from './ButtongroupSupTestComponent';
import { ButtongroupIdComponent } from './ButtongroupIdComponent';
import { ButtongroupIdTestComponent } from './ButtongroupIdTestComponent';
import { ButtongroupBeforeclickComponent } from './ButtongroupBeforeclickComponent';

@NgModule({
  imports: [
    CommonModule,
    TiButtongroupModule,
    TiIconModule,
    FormsModule,
    ReactiveFormsModule,
    DemoLogModule,
    RouterModule.forChild(ButtonGroupTestModule.ROUTES),
  ],
  declarations: [
    ButtongroupItemsComponent,
    ButtongroupMultipleComponent,
    ButtongroupValuekeyComponent,
    ButtongroupValuekeyTestComponent,
    ButtongroupRadioTypeComponent,
    ButtongroupMultiTypeComponent,
    ButtongroupDeselectableComponent,
    ButtongroupMinwidthComponent,
    ButtongroupTemplateComponent,
    ButtongroupTipComponent,
    ButtongroupSupComponent,
    ButtongroupReactiveFormsComponent,
    ButtongroupActiveclassComponent,
    ButtongroupItemsTestComponent,
    ButtongroupManyComponent,
    ButtongroupMultilineComponent,
    ButtongroupDisabledComponent,
    ButtongroupEnumComponent,
    ButtongroupEventComponent,
    ButtongroupFocusComponent,
    ButtongroupSupTestComponent,
    ButtongroupIdComponent,
    ButtongroupIdTestComponent,
    ButtongroupBeforeclickComponent,
  ],
})
export class ButtonGroupTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiButtongroupComponent.html', label: 'Buttongroup' }];
  static readonly ROUTES: Routes = [
    {
      path: 'buttongroup/buttongroup-items',
      component: ButtongroupItemsComponent,
    },
    {
      path: 'buttongroup/buttongroup-multiple',
      component: ButtongroupMultipleComponent,
    },
    {
      path: 'buttongroup/buttongroup-radio-type',
      component: ButtongroupRadioTypeComponent,
    },
    {
      path: 'buttongroup/buttongroup-multi-type',
      component: ButtongroupMultiTypeComponent,
    },
    {
      path: 'buttongroup/buttongroup-disabled',
      component: ButtongroupDisabledComponent,
    },
    {
      path: 'buttongroup/buttongroup-event',
      component: ButtongroupEventComponent,
    },
    {
      path: 'buttongroup/buttongroup-beforeclick',
      component: ButtongroupBeforeclickComponent,
    },
    {
      path: 'buttongroup/buttongroup-focus',
      component: ButtongroupFocusComponent,
    },
    {
      path: 'buttongroup/buttongroup-valuekey',
      component: ButtongroupValuekeyComponent,
    },
    {
      path: 'buttongroup/buttongroup-deselectable',
      component: ButtongroupDeselectableComponent,
    },
    {
      path: 'buttongroup/buttongroup-minwidth',
      component: ButtongroupMinwidthComponent,
    },
    {
      path: 'buttongroup/buttongroup-template',
      component: ButtongroupTemplateComponent,
    },
    {
      path: 'buttongroup/buttongroup-tip',
      component: ButtongroupTipComponent,
    },
    {
      path: 'buttongroup/buttongroup-reactive-forms',
      component: ButtongroupReactiveFormsComponent,
    },
    {
      path: 'buttongroup/buttongroup-sup',
      component: ButtongroupSupComponent,
    },
    {
      path: 'buttongroup/buttongroup-id',
      component: ButtongroupIdComponent,
    },
    {
      path: 'buttongroup/buttongroup-multiline',
      component: ButtongroupMultilineComponent,
    },
    {
      path: 'buttongroup/buttongroup-activeclass',
      component: ButtongroupActiveclassComponent,
    },
    {
      path: 'buttongroup/buttongroup-valuekey-test',
      component: ButtongroupValuekeyTestComponent,
    },
    {
      path: 'buttongroup/buttongroup-many',
      component: ButtongroupManyComponent,
    },
    {
      path: 'buttongroup/buttongroup-enum',
      component: ButtongroupEnumComponent,
    },
    {
      path: 'buttongroup/buttongroup-items-test',
      component: ButtongroupItemsTestComponent,
    },
    {
      path: 'buttongroup/buttongroup-sup-test',
      component: ButtongroupSupTestComponent,
    },
    {
      path: 'buttongroup/buttongroup-id-test',
      component: ButtongroupIdTestComponent,
    },
  ];
}
