import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TProBaseDropDownMenuDirective } from './dropdown-menu.directive';
import { TProBaseDropDownToggleDirective } from './dropdown-toggle.directive';
import { TProBaseDropDownAppendToBodyComponent } from './dropdown.component';
import { TProBaseDropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [TProBaseDropDownDirective, TProBaseDropDownMenuDirective, TProBaseDropDownToggleDirective, TProBaseDropDownAppendToBodyComponent],
  declarations: [TProBaseDropDownDirective, TProBaseDropDownMenuDirective, TProBaseDropDownToggleDirective, TProBaseDropDownAppendToBodyComponent],
})
export class TProBaseDropDownModule {}
