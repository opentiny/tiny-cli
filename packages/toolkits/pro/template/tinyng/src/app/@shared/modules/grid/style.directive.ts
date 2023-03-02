import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProBaseBreakpoint, TProBaseBreakpoints, TProBaseResponseParameter } from './layout.types';
import { TProBaseScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[tProBaseStyle]`,
})

export class TProBaseStyleDirective implements OnInit, OnDestroy {
  @Input() tProBaseStyle: TProBaseResponseParameter<Object>;

  private destroy$ = new Subject();
  private styleObject = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: TProBaseScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateStyle(currentPoint);
      });
  }

  updateStyle(currentPoint: TProBaseBreakpoint | undefined): void {
    let finalStyleObject = {};
    let isResponse = false;

    if (this.tProBaseStyle) {
      for (const point of TProBaseBreakpoints) {
        if ((this.tProBaseStyle as any)[point]) {
          finalStyleObject = { ...finalStyleObject, ...(this.tProBaseStyle as any)[point] };
          isResponse = true;
        }
        if (currentPoint === point) {
          break;
        }
      }

      if (!isResponse) {
        finalStyleObject = { ...this.tProBaseStyle };
      }
    }

    Object.keys(this.styleObject).forEach(key => {
      this.renderer.removeStyle(this.elementRef.nativeElement, key);
    });

    Object.keys(finalStyleObject).forEach(key => {
      this.renderer.setStyle(this.elementRef.nativeElement, key, (finalStyleObject as any)[key]);
    });

    this.styleObject = finalStyleObject;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
