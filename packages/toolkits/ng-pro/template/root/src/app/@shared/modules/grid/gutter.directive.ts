import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProBaseBreakpoints, TProBaseBreakpoint, TProBaseResponseParameter } from './layout.types';
import { TProBaseScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[tProBaseGutter]`,
})

export class TProBaseGutterDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private executedGutter: [number, number] = [0, 0];

  @Input() tProBaseGutter: TProBaseResponseParameter<number | [number, number]>;
  @Input() tProBaseGutterDirection: 'vertical' | 'horizontal';
  @Input() tProBaseGutterNoOuter: TProBaseResponseParameter<boolean>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: TProBaseScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateGutter(currentPoint);
      });
  }

  private getCurrentGutter(currentPoint: TProBaseBreakpoint | undefined): [number, number] {
    let finalGutter: [number, number] = [0, 0];
    if (Array.isArray(this.tProBaseGutter) || typeof this.tProBaseGutter === 'number') {
      finalGutter = this._transGutterToArray(this.tProBaseGutter);
    } else {
      for (const point of TProBaseBreakpoints) {
        if (this.tProBaseGutter[point] !== undefined) {
          finalGutter = this._transGutterToArray(this.tProBaseGutter[point]);
        }
        if (currentPoint === point) {
          break;
        }
      }
    }

    return finalGutter;
  }

  private _transGutterToArray(gutter: any): [number, number] {
    let finalGutter = gutter;
    if (typeof gutter === 'number') {
      finalGutter = [gutter, null];
    }
    if (this.tProBaseGutterDirection === 'vertical') {
      finalGutter = finalGutter.reverse() as [number, number];
    }

    return finalGutter;
  }

  updateGutter(currentPoint: TProBaseBreakpoint | undefined) {
    const finalGutter = this.getCurrentGutter(currentPoint);

    this.updateChildrenGutter(finalGutter);
    this.updateParentGutter(finalGutter);

    this.executedGutter = finalGutter;
  }

  updateChildrenGutter(gutter: [number, number]) {
    const items = this.elementRef.nativeElement.children;

    for (let i = 0; i < items.length; i++) {
      if (gutter[0] !== null) {
        this.renderer.setStyle(items[i], 'padding-left', gutter[0] / 2 + 'px');
        this.renderer.setStyle(items[i], 'padding-right', gutter[0] / 2 + 'px');
      } else if (this.executedGutter[0] !== 0) {
        this.renderer.removeStyle(items[i], 'padding-left');
        this.renderer.removeStyle(items[i], 'padding-right');
      }
      if (gutter[1] !== null) {
        this.renderer.setStyle(items[i], 'padding-top', gutter[1] / 2 + 'px');
        this.renderer.setStyle(items[i], 'padding-bottom', gutter[1] / 2 + 'px');
      } else if (this.executedGutter[1] !== 0) {
        this.renderer.removeStyle(items[i], 'padding-top');
        this.renderer.removeStyle(items[i], 'padding-bottom');
      }
    }
  }

  updateParentGutter(gutter: [number, number]) {
    if (this.tProBaseGutterNoOuter) {
      const element = this.elementRef.nativeElement;
      if (gutter[0] !== null) {
        this.renderer.setStyle(element, 'margin-left', -gutter[0] / 2 + 'px');
        this.renderer.setStyle(element, 'margin-right', -gutter[0] / 2 + 'px');
      } else if (this.executedGutter[0] !== 0) {
        this.renderer.removeStyle(element, 'margin-left');
        this.renderer.removeStyle(element, 'margin-right');
      }
      if (gutter[1] !== null) {
        this.renderer.setStyle(element, 'margin-top', -gutter[1] / 2 + 'px');
        this.renderer.setStyle(element, 'margin-bottom', -gutter[1] / 2 + 'px');
      } else if (this.executedGutter[1] !== 0) {
        this.renderer.removeStyle(element, 'margin-top');
        this.renderer.removeStyle(element, 'margin-bottom');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
