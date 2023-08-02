import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 't-pro-basic-aside',
  exportAs: 'tProBasicAside',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host.t-pro-basic-aside {
      }
    `,
  ],
})
export class AsideComponent {
  @HostBinding('class.t-pro-basic-aside') default = true;
}
