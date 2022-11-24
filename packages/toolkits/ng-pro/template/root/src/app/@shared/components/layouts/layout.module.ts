import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiIconModule } from '@opentiny/ng';
import {
  TProLayoutComponent,
  TProLayoutFooterComponent,
  TProLayoutHeaderComponent,
  TProLayoutSecHeaderComponent,
  TProLayoutSecSidebarComponent,
  TProLayoutSidebarComponent,
  TProLayoutSidebarToolsComponent,
} from './layout.component';
import { TProBaseLayoutModule } from '../../modules/layout/layout.module';

@NgModule({
  declarations: [
    TProLayoutComponent,
    TProLayoutFooterComponent,
    TProLayoutHeaderComponent,
    TProLayoutSecHeaderComponent,
    TProLayoutSecSidebarComponent,
    TProLayoutSidebarComponent,
    TProLayoutSidebarToolsComponent,
  ],
  imports: [
    CommonModule,
    TProBaseLayoutModule,
    TiIconModule
  ],
  exports: [
    TProLayoutComponent,
    TProLayoutFooterComponent,
    TProLayoutHeaderComponent,
    TProLayoutSecHeaderComponent,
    TProLayoutSecSidebarComponent,
    TProLayoutSidebarComponent,
    TProLayoutSidebarToolsComponent,
  ],
})
export class TProLayoutModule { }
