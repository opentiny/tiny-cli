import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/tiny-pro';
import { ServicePurchaseComponent } from './service-purchase.component';
import { RegionSelectComponent } from './widgets/region-select/region-select.component';
import { ServiceImageComponent } from './widgets/service-image/service-image.component';
import { ServiceConfigurationComponent } from './widgets/service-configuration/service-configuration.component';
import { PurchaseSettingsComponent } from './widgets/purchase-settings/purchase-settings.component';
import { BuyLayerComponent } from './widgets/buy-layer/buy-layer.component';

@NgModule({
  declarations: [
    ServicePurchaseComponent,
    RegionSelectComponent,
    ServiceImageComponent,
    ServiceConfigurationComponent,
    PurchaseSettingsComponent,
    BuyLayerComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ServicePurchaseModule {}
