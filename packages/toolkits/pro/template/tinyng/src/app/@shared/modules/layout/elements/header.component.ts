import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 't-pro-basic-header',
  exportAs: 'tProBasicHeader',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host.t-pro-basic-header {
        flex: 0 0 auto;
      }
    `,
  ],
})
export class HeaderBasicComponent {
  @HostBinding('class.t-pro-basic-header') default = true;
}
