import { Component } from '@angular/core';
import { recommendObj } from './constants';
@Component({
  selector: 't-pro-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent {
  public recommendObj = recommendObj;
  constructor() {}

  openUrl(url: string) {
    const win = window.open(url);

    // 防止window.open()的安全漏洞
    if (win) {
      win.opener = null;
    }
  }
}
