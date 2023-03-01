import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TProBaseTagComponent } from './tag.component';
import { TProBaseTagsComponent } from './tags.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TProBaseTagsComponent,
    TProBaseTagComponent
  ],
  declarations: [
    TProBaseTagsComponent,
    TProBaseTagComponent
  ]
})
export class TProBaseTagsModule { }
