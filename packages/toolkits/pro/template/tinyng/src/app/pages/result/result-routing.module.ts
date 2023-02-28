import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultComponent } from './result.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent,
    children: [
      { path: 'success', component: PaymentSuccessComponent },
      { path: 'failure', component: PaymentFailureComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
