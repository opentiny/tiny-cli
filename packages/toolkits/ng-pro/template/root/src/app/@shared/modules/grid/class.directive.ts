import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProBaseBreakpoints, TProBaseBreakpoint, TProBaseResponseParameter } from './layout.types';
import { TProBaseScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[tProBaseClass]`,
})

export class TProBaseClassDirective implements OnInit, OnDestroy {
  @Input() tProBaseClass: TProBaseResponseParameter<string[]>;

  private destroy$ = new Subject();
  private executedClassList: string[] = [];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: TProBaseScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateClass(currentPoint);
      });
  }

  updateClass(currentPoint: TProBaseBreakpoint | undefined) {
    let finalClassList: any = [];

    if (!Array.isArray(this.tProBaseClass)) {
      for (const point of TProBaseBreakpoints) {
        if (this.tProBaseClass[point]) {
          finalClassList = [...finalClassList, ...this.tProBaseClass[point] || []];
        }
        if (currentPoint === point) {
          break;
        }
      }
    } else if (this.tProBaseClass) {
      finalClassList = [...this.tProBaseClass];
    }

    this.executedClassList.forEach(className => {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    });

    finalClassList.forEach((className: string) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });

    this.executedClassList = finalClassList;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
