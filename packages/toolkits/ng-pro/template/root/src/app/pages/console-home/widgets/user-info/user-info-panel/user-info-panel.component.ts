import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const ORDER_RENEW_WITHIN_DAY = 7;
const CHARGE_COUNT = 62;
const ORDER_COUNT = 3;
const WORKER_COUNT = 100;

@Component({
  selector: 't-pro-user-info-panel',
  templateUrl: './user-info-panel.component.html',
  styleUrls: ['./user-info-panel.component.scss'],
})
export class UserInfoPanelComponent implements OnInit {
  public panelData = [
    {
      count: CHARGE_COUNT,
      text: this.translate.instant('consoleHome.userInfo.feesLabel', {
        days: ORDER_RENEW_WITHIN_DAY,
      }),
    },
    {
      count: ORDER_COUNT,
      text: this.translate.instant('consoleHome.userInfo.orderLabel'),
    },
    {
      count: WORKER_COUNT,
      text: this.translate.instant('consoleHome.userInfo.workerLabel'),
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}
}
