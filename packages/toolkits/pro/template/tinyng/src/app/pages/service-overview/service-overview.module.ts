import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/tiny-pro';
import { ServiceOverviewComponent } from './service-overview.component';
import { ServiceIntroduceComponent } from './widgets/service-introduce/service-introduce.component';
import { ServiceCreationComponent } from './widgets/service-creation/service-creation.component';
import { GrowthMapComponent } from './widgets/growth-map/growth-map.component';

@NgModule({
  declarations: [ServiceOverviewComponent, ServiceIntroduceComponent, ServiceCreationComponent, GrowthMapComponent],
  imports: [CommonModule, SharedModule],
})
export class ServiceOverviewModule {}
