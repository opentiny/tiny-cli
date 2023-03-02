import { Component, HostBinding, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProLayoutService } from './layout.service';
import { TProLayoutConfig } from './layout.type';
import { SIZE } from '@shared/tiny-pro';
@Component({
  selector: 't-pro-layout-header',
  template: '<ng-content></ng-content>'
})
export class TProLayoutHeaderComponent implements OnDestroy {
  private destroy$ = new Subject();

  @HostBinding('class.t-pro-layout-header') default = true;
  @HostBinding('style.height')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: TProLayoutConfig['header'];

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config!.header!.firHeader;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout-sec-header',
  template: '<ng-content></ng-content>'
})
export class TProLayoutSecHeaderComponent implements OnDestroy {
  private destroy$ = new Subject();

  @HostBinding('class.t-pro-layout-sec-header') default = true;
  @HostBinding('style.height')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: TProLayoutConfig['header'];

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config!.header!.secHeader;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout-sidebar',
  template: '<ng-content></ng-content>'
})
export class TProLayoutSidebarComponent implements OnDestroy {
  private destroy$ = new Subject();

  @HostBinding('class.t-pro-layout-sidebar') default = true;
  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: TProLayoutConfig['sidebar']['firSidebar'];

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config.sidebar.firSidebar;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout-sec-sidebar',
  template: '<ng-content></ng-content>'
})
export class TProLayoutSecSidebarComponent implements OnDestroy {
  private destroy$ = new Subject();

  @HostBinding('class.t-pro-layout-sec-sidebar') default = true;
  @HostBinding('style.width')
  get width() {
    return this?.config?.width + 'px';
  }

  @HostBinding('style.z-index')
  get zIndex() {
    return this?.config?.zIndex;
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: TProLayoutConfig['sidebar']['secSidebar'];

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config.sidebar.secSidebar;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout-sidebar-tools',
  template: `
    <div class="t-pro-sidebar-tools-item" (click)="sidebarShrink(!isSidebarShrink)"></div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class TProLayoutSidebarToolsComponent implements OnDestroy {
  private destroy$ = new Subject();
  isSidebarShrink: boolean = false;
  config: TProLayoutConfig = { id: 'sidebar', sidebar: {} };

  @HostBinding('class.t-pro-sidebar-tools') default = true;
  @HostBinding('style.width')
  get width() {
    return this?.config?.sidebar?.firSidebar?.width + 'px';
  }

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config;
        this.isSidebarShrink = !!this.config.sidebar.shrink;
      });
  }

  sidebarShrink(isShrink: boolean) {
    this.isSidebarShrink = isShrink;
    if (this.config.sidebar.firSidebar) {
      this.config.sidebar.firSidebar.width = this.isSidebarShrink ? SIZE.CLOSE_WIDTH : SIZE.OPEN_WIDTH;
    }
    this.config.sidebar.shrink = this.isSidebarShrink;
    this.layoutService.updateLayoutConfig(this.config);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout-footer',
  template: '<ng-content></ng-content>'
})
export class TProLayoutFooterComponent implements OnDestroy {
  private destroy$ = new Subject();

  @HostBinding('class.t-pro-layout-footer') default = true;
  @HostBinding('style.width')
  get height() {
    return this?.config?.height + 'px';
  }

  @HostBinding('style.display')
  get display() {
    return this?.config?.hidden ? 'none' : null;
  }

  @Input() config: TProLayoutConfig['footer'];

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config.footer;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

@Component({
  selector: 't-pro-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TProLayoutComponent implements OnDestroy {
  @HostBinding('class.t-pro-layout') default = true;
  private destroy$ = new Subject();

  @Input() config: TProLayoutConfig;

  getSidebarWidth(): string {
    let width = 0;

    if (this.config.sidebar.hidden) {
      return width + 'px';
    }

    if (!this.config!.sidebar!.firSidebar!.hidden) {
      width += this.config!.sidebar!.firSidebar!.width!;
    }

    if (!this.config!.sidebar!.secSidebar!.hidden) {
      width += this.config!.sidebar!.secSidebar!.width!;
    }

    return width + 'px';
  }

  getHeaderHeight(): string {
    let height = 0;

    if (this.config!.header!.hidden) {
      return height + 'px';
    }

    if (!this.config!.header!.firHeader!.hidden) {
      height += this.config!.header!.firHeader!.height!;
    }

    if (!this.config!.header!.secHeader!.hidden) {
      height += this.config!.header!.secHeader!.height!;
    }

    return height + 'px';
  }

  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config;
      });
  }



  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
