import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, TProLayoutModule } from '@shared/tiny-pro';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { ResultSuccessComponent } from './widget/result-success/result-success.component';
import { RecommendActivityComponent } from './widget/recommend-activity/recommend-activity.component';
import { ResultFailureComponent } from './widget/result-failure/result-failure.component';

@NgModule({
  declarations: [
    ResultComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    ResultSuccessComponent,
    RecommendActivityComponent,
    ResultFailureComponent,
  ],
  imports: [SharedModule, TProLayoutModule, CommonModule, ResultRoutingModule],
})
export class ResultModule {}
