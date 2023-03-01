import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsoleHomeComponent } from '../pages/console-home/console-home.component';
import { ServiceOverviewComponent } from './service-overview/service-overview.component';
import { ServicePurchaseComponent } from './service-purchase/service-purchase.component';
import { NonSupportRegionComponent } from './non-support-region/non-support-region.component';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'console-home',
        component: ConsoleHomeComponent,
      },
      {
        path: 'service-overview',
        component: ServiceOverviewComponent,
      },
      {
        path: 'service-purchase',
        component: ServicePurchaseComponent,
      },
      {
        path: 'service-list',
        loadChildren: () => import('./service-list/service-list.module').then((m) => m.ServiceListModule),
      },
      {
        path: 'result',
        loadChildren: () => import('./result/result.module').then((m) => m.ResultModule),
      },
      {
        path: 'non-support-region',
        component: NonSupportRegionComponent,
      },
      {
        path: '',
        redirectTo: 'console-home',
        pathMatch: 'prefix',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
