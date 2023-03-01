import { Component, Input } from '@angular/core';
import { CateMenu } from '../constants';

@Component({
  selector: 't-pro-marketplace-all-svg',
  templateUrl: './marketplace-all-svg.component.html',
})
export class MarketplaceAllSvgComponent {
  @Input() cate: string = '';
  public cateMenu = CateMenu;

  constructor() {}
}
