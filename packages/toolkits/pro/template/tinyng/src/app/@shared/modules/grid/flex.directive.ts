import { Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { updateClassList } from './layout-utils';
import { TProBaseAlign, TProBaseAlignSelf, TProBaseBreakpoints, TProBaseBreakpoint, TProBaseJustify, TProBaseResponseParameter } from './layout.types';
import { TProBaseScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[tProBaseFlex], t-pro-base-row, t-pro-base-col`,
})

export class TProBaseFlexDirective implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.flex-row') get flexRow() {
    return this.tProBaseFlexContainer === 'row';
  }
  @HostBinding('class.flex-column') get flexColumn() {
    return this.tProBaseFlexContainer === 'column';
  }
  @HostBinding('class.d-flex') get flex() {
    return !!this.tProBaseFlexContainer;
  }

  @Input() tProBaseFlex: TProBaseResponseParameter<number | string> | undefined;

  /* TODO: 这个也需要响应式 */
  @Input() tProBaseFlexContainer: 'row' | 'column';

  @Input() tProBaseOrder: TProBaseResponseParameter<number>;
  @Input() tProBaseAlign: TProBaseResponseParameter<TProBaseAlign>;
  @Input() tProBaseAlignSelf: TProBaseResponseParameter<TProBaseAlignSelf>;
  @Input() tProBaseJustify: TProBaseResponseParameter<TProBaseJustify>;

  private destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: TProBaseScreenMediaQueryService
  ) { }

  parseFlex(flex: any): string {
    if (typeof flex === 'number') {
      return `${flex}`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }

  updateFlex(currentPoint: TProBaseBreakpoint | undefined) {
    let finalFlex: number | string | undefined = '';
    if (this.tProBaseFlex) {
      if (typeof this.tProBaseFlex === 'object') {
        for (const point of TProBaseBreakpoints) {
          if (this.tProBaseFlex[point]) {
            finalFlex = this.tProBaseFlex[point];
          }
          if (currentPoint === point) {
            break;
          }
        }
      } else {
        finalFlex = this.tProBaseFlex;
      }
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'flex', this.parseFlex(finalFlex));
  }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateFlex(currentPoint);
      });
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
