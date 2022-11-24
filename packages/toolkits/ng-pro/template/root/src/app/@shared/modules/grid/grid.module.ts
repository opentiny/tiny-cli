import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TProBaseRowComponent } from './row.component';
import { TProBaseColComponent } from './col.component';
import { TProBaseClassDirective } from './class.directive';
import { TProBaseFlexDirective } from './flex.directive';
import { TProBaseGutterDirective } from './gutter.directive';
import { TProBaseSpaceDirective } from './space.directive';
import { TProBaseStyleDirective } from './style.directive';

@NgModule({
  declarations: [
    TProBaseRowComponent,
    TProBaseColComponent,
    TProBaseClassDirective,
    TProBaseFlexDirective,
    TProBaseGutterDirective,
    TProBaseSpaceDirective,
    TProBaseStyleDirective,
  ],
  imports: [CommonModule],
  exports: [
    TProBaseRowComponent,
    TProBaseColComponent,
    TProBaseClassDirective,
    TProBaseFlexDirective,
    TProBaseGutterDirective,
    TProBaseSpaceDirective,
    TProBaseStyleDirective,
  ],
})
export class TProBaseGridModule {}
