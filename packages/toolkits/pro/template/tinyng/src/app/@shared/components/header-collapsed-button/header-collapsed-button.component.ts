import { Component, Input } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';
@Component({
  selector: 't-pro-header-collapsed-button',
  templateUrl: './header-collapsed-button.component.html',
  styleUrls: ['./header-collapsed-button.component.scss'],
})
export class HeaderCollapsedButtonComponent {
  @Input() menu: any;
  @Input() hideLogo: boolean = false;
  public active: TiLeftmenuItem;
  num: number = 1;
  marginLeft: string = '250px';
  collapsed: boolean = true;
  toggleable: boolean = false;
  reloadState: boolean = true;

  SideMenuDrawer(num: number) {
    switch (num) {
      case 0:
        this.collapsed = false;
        break;
      case 1:
        this.collapsed = true;
        break;
      case 2:
        this.collapsed = !this.collapsed;
        break;
      default:
        return;
    }
  }
}
