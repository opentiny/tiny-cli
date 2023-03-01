import { Component, OnInit } from '@angular/core';
import { MarketplaceMenus, CateContent, MarketplaceUrl, MarketContent } from './constants';

@Component({
  selector: 't-pro-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent implements OnInit {
  public marketplaceMenus = MarketplaceMenus;
  public cateContent = CateContent;
  public enterMarketplace = MarketplaceUrl;
  public marketContent = MarketContent;

  constructor() {}

  ngOnInit(): void {}

  openUrl(url: string) {
    const win = window.open(url);

    // 防止window.open()的安全漏洞
    if (win) {
      win.opener = null;
    }
  }
}
