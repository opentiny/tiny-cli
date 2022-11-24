import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsoleHomeComponent } from '../pages/console-home/console-home.component';
import { HelloWorldComponent } from '../pages/hello-world/hello-world.component';
import { ContractsComponent } from './contracts/contracts.component';
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
        path: 'hello-world',
        component: HelloWorldComponent,
      },
      {
        path: 'contracts',
        component: ContractsComponent,
      },
      // 可在此处添加您模块的路由
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
