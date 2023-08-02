import { Component, HostBinding, ContentChildren, QueryList } from '@angular/core';
import { AsideComponent } from './elements/aside.component';

@Component({
  selector: 't-pro-basic-layout',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host.t-pro-basic-layout {
        display: flex;
        flex: auto;
        flex-direction: column;

        &-aside {
          flex-direction: row;
        }
      }
    `,
  ],
})
export class LayoutComponent {
  @ContentChildren(AsideComponent) listOfSideBarComponent: QueryList<AsideComponent>;
  @HostBinding('class.t-pro-basic-layout-aside')
  get layoutSideBar(): boolean {
    return this.listOfSideBarComponent && this.listOfSideBarComponent.length > 0;
  }
  @HostBinding('class.t-pro-basic-layout') default = true;
}
