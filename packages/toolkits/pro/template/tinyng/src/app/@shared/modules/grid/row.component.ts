import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { updateClassList } from './layout-utils';
import { TProBaseResponseParameter } from './layout.types';

@Component({
  selector: 't-pro-base-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host.t-pro-base-row {
        margin: 0;
        padding: 0;
      }
    `,
  ],
  preserveWhitespaces: false,
})
export class TProBaseRowComponent implements OnInit, OnChanges {
  @HostBinding('class.row') row = true;
  @HostBinding('class.flex-row') flexRow = true;
  @HostBinding('class.t-pro-base-row') tProBaseRow = true;

  @Input() tProBaseCols: TProBaseResponseParameter<number>; // number只能是[0 - 12]

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }
}
