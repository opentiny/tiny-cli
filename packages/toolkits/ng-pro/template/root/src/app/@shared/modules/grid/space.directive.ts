import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProBaseBreakpoints, TProBaseBreakpoint, TProBaseResponseParameter } from './layout.types';
import { TProBaseScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[tProBaseSpace]`,
})

export class TProBaseSpaceDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  private executedSpace: [number, number] = [0, 0];

  @Input() tProBaseSpace: TProBaseResponseParameter<number | [number, number]>;
  @Input() tProBaseSpaceDirection: TProBaseResponseParameter<'vertical' | 'horizontal'>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: TProBaseScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateSpace(currentPoint);
      });
  }

  private getCurrentSpace(currentPoint: TProBaseBreakpoint | undefined): [number, number] {
    let finalSpace: [number, number] = [0, 0];
    if (Array.isArray(this.tProBaseSpace) || typeof this.tProBaseSpace === 'number') {
      finalSpace = this._transSpaceToArray(this.tProBaseSpace);
    } else {
      for (const point of TProBaseBreakpoints) {
        if (this.tProBaseSpace[point] !== undefined) {
          finalSpace = this._transSpaceToArray(this.tProBaseSpace[point]);
        }
        if (currentPoint === point) {
          break;
        }
      }
    }

    return finalSpace;
  }

  private _transSpaceToArray(space: any): [number, number] {
    let finalSpace = space;
    if (typeof space === 'number') {
      finalSpace = [space, null];
    }
    if (this.tProBaseSpaceDirection === 'horizontal') {
      finalSpace = finalSpace.reverse() as [number, number];
    }

    return finalSpace;
  }

  updateSpace(currentPoint: TProBaseBreakpoint | undefined) {
    const finalSpace = this.getCurrentSpace(currentPoint);

    const items = this.elementRef.nativeElement.children;

    for (let i = 0; i < items.length - 1; i++) {
      if (finalSpace[0] !== null) {
        this.renderer.setStyle(items[i], 'margin-bottom', finalSpace[0] + 'px');
      } else if (this.executedSpace[0] !== 0) {
        this.renderer.removeStyle(items[i], 'margin-bottom');
      }
      if (finalSpace[1] !== null) {
        this.renderer.setStyle(items[i], 'margin-right', finalSpace[1] + 'px');
      } else if (this.executedSpace[1] !== 0) {
        this.renderer.removeStyle(items[i], 'margin-right');
      }
    }

    this.executedSpace = finalSpace;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
