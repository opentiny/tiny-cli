import { NgModule } from '@angular/core';
import { SharedModule, TProLayoutModule, TProTranslatePipe } from '@shared/tiny-pro';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ConsoleHomeModule } from './console-home/console-home.module';
import { ServiceOverviewModule } from './service-overview/service-overview.module';
import { ServicePurchaseModule } from './service-purchase/service-purchase.module';
import { ServiceListModule } from './service-list/service-list.module';
import { NonSupportRegionModule } from './non-support-region/non-support-region.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    TProLayoutModule,
    ConsoleHomeModule,
    ServiceOverviewModule,
    ServicePurchaseModule,
    ServiceListModule,
    NonSupportRegionModule,
  ],
  declarations: [PagesComponent],
  providers: [TProTranslatePipe],
})
export class PagesModule {}
