import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/tiny-pro';
import { NonSupportRegionComponent } from './non-support-region.component';
import { NonSupportContentComponent } from './non-support-content/non-support-content.component';

@NgModule({
  declarations: [NonSupportRegionComponent, NonSupportContentComponent],
  imports: [CommonModule, SharedModule],
})
export class NonSupportRegionModule {}
