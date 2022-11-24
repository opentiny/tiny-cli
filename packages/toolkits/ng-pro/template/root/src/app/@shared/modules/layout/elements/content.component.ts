import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 't-pro-basic-content',
  exportAs: 'tProBasicContent',
  template: '<ng-content></ng-content>',
  styles: [
    `
    :host.t-pro-basic-content {
      flex: auto;
      min-height: 0;
    }
    `
  ]
})
export class ContentComponent {
  @HostBinding('class.t-pro-basic-content') default = true;
}
