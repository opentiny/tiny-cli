import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TProBaseAvatarComponent } from './avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TProBaseAvatarComponent,
  ],
  declarations: [
    TProBaseAvatarComponent,
  ]
})
export class TProBaseAvatarModule {}
