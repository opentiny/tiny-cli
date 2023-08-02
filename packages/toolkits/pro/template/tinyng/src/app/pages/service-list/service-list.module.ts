import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/tiny-pro';
import { ServiceListRoutingModule } from './service-list-routing.module';
import { ServiceListComponent } from './service-list.component';
import { ListGuideHeadComponent } from './widgets/list-guide-head/list-guide-head.component';
import { ObsTableComponent } from './widgets/list-detail-content/obs-table/obs-table.component';
import { BucketInfoComponent } from './widgets/list-detail-content/bucket-info/bucket-info.component';
import { ObsFileDropComponent } from './widgets/list-detail-content/obs-file-drop/obs-file-drop.component';
import { ContractsTableComponent } from './widgets/list-detail-content/contracts-table/contracts-table.component';
import { ContractsModalComponent } from './widgets/list-detail-content/contracts-modal/contracts-modal.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { ContractsComponent } from './contracts/contracts.component';

@NgModule({
  declarations: [
    ServiceListComponent,
    ListGuideHeadComponent,
    ObsTableComponent,
    BucketInfoComponent,
    ObsFileDropComponent,
    BucketListComponent,
    ContractsComponent,
    ContractsTableComponent,
    ContractsModalComponent,
  ],
  imports: [CommonModule, SharedModule, ServiceListRoutingModule],
})
export class ServiceListModule {}
export { GuideheadConfig } from './widgets/list-guide-head/list-guide-head.component';
