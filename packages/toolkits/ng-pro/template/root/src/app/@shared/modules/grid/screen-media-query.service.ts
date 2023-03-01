import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProBaseBreakpoint, TProBaseBreakpoints, TProBaseBreakpointsMap } from './layout.types';

@Injectable({ providedIn: 'root' })
export class TProBaseScreenMediaQueryService implements OnDestroy {
  private currentPoint: TProBaseBreakpoint | undefined;
  private pointChangeSub: ReplaySubject<{ currentPoint: TProBaseBreakpoint | undefined; change: number; compare: { [key: string]: number } }> =
    new ReplaySubject(1);
  private destroy$ = new Subject();

  // 可以传入一个基准point，返回数据结构{ currentPoint, 变大or变小or没变，比基准point大or小or一样 }
  public getPoint(): ReplaySubject<{ currentPoint: TProBaseBreakpoint | undefined; change: number; compare: { [key: string]: number } }> {
    if (!this.currentPoint) {
      this.currentPoint = this.getCurrentPoint();
      this.pointChangeSub.next({
        currentPoint: this.currentPoint,
        change: 0,
        compare: this.comparePoints(this.currentPoint),
      });

      fromEvent(window, 'resize')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          const tempPoint = this.getCurrentPoint();
          if (this.currentPoint !== tempPoint) {
            const change = this.comparePoints(tempPoint, this.currentPoint) as number;
            this.currentPoint = tempPoint;

            this.pointChangeSub.next({
              currentPoint: this.currentPoint,
              change: change,
              compare: this.comparePoints(tempPoint),
            });
          }
        });
    }

    return this.pointChangeSub;
  }

  // 无p2，则全量对比
  private comparePoints(p1: TProBaseBreakpoint | undefined, p2?: TProBaseBreakpoint) {
    let index1: any;
    let index2: any;
    for (let i = 0; i < TProBaseBreakpoints.length; i++) {
      if (p1 === TProBaseBreakpoints[i]) {
        index1 = i;
      }
      if (p2 === TProBaseBreakpoints[i]) {
        index2 = i;
      }
    }

    if (!p2) {
      const res: any = {};
      TProBaseBreakpoints.forEach((point, index) => {
        res[point] = index1 - index;
      });

      return res;
    }

    return index1 - index2;
  }

  getCurrentPoint(): TProBaseBreakpoint | undefined {
    const currentScreenWidth = window.innerWidth;
    for (let i = 0; i < TProBaseBreakpoints.length; i++) {
      if (TProBaseBreakpointsMap[TProBaseBreakpoints[i]] >= currentScreenWidth || i === TProBaseBreakpoints.length - 1) {
        return TProBaseBreakpoints[i] as TProBaseBreakpoint;
      }
    }
    return;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
