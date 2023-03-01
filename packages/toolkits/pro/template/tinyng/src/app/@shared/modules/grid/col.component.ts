import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { updateClassList } from './layout-utils';
import { TProBaseResponseParameter } from './layout.types';

@Component({
  selector: 't-pro-base-col',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host.t-pro-base-col {
      padding: 0;
    }
  `]
})
export class TProBaseColComponent implements OnInit, OnChanges {
  @HostBinding('class.t-pro-base-col') tProBaseCol = true;

  @Input() tProBaseSpan: TProBaseResponseParameter<number | 'auto'> = 'auto';
  @Input() tProBaseOffset: TProBaseResponseParameter<number>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }
}
