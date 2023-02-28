import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceListComponent } from './service-list.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceListComponent,
    children: [{ path: 'buckets', component: BucketListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceListRoutingModule {}
