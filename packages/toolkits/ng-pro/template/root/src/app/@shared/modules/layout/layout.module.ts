import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AsideComponent } from './elements/aside.component';
import { ContentComponent } from './elements/content.component';
import { FooterBasicComponent } from './elements/footer.component';
import { HeaderBasicComponent } from './elements/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    ContentComponent,
    FooterBasicComponent,
    HeaderBasicComponent,
  ],
  imports: [CommonModule],
  exports: [
    LayoutComponent,
    AsideComponent,
    ContentComponent,
    FooterBasicComponent,
    HeaderBasicComponent,
  ],
})
export class TProBaseLayoutModule {}
