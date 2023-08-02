import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 't-pro-basic-footer',
  exportAs: 'tProBasicFooter',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host.t-pro-basic-footer {
        text-align: center;
        line-height: 1.5;
      }
    `,
  ],
})
export class FooterBasicComponent {
  @HostBinding('class.t-pro-basic-footer') default = true;
}
