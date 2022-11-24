import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './@core/services/auth-guard-service.guard';
import { LoginComponent, RegisterComponent } from '@shared/tiny-pro';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'pages/login',
    component: LoginComponent,
  },
  {
    path: 'pages/register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
