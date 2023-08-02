import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { TiLeftmenuItem } from '@opentiny/ng';
import { TProLayoutService, TProLayoutConfig } from '../layouts/index';
import { SIZE } from '@shared/tiny-pro';
@Component({
  selector: 't-pro-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnChanges {
  @Input() data: any;
  @Input() toggleable: boolean = true;
  private destroy$ = new Subject();
  public reloadState: boolean = true;
  public active: TiLeftmenuItem;
  public config: TProLayoutConfig;
  public isSidebarShrink: boolean = false;
  constructor(private layoutService: TProLayoutService) {
    this.layoutService
      .getLayoutConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: TProLayoutConfig) => {
        this.config = config;
      });
  }

  ngOnInit() {
    // 根据当前窗口大小调整侧边栏
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(100))
      .subscribe(() => {
        const currentScreenWidth = window.innerWidth;
        this.isSidebarShrink = currentScreenWidth < 1025;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.active = this.data[0];
    }
  }

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

    // 左侧菜单自适应宽度适配
    if (this.isSidebarShrink) {
      width = 72;
    }

    return width + 'px';
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public toggleClick(isHide: boolean): void {
    this.isSidebarShrink = isHide;

    if (this.config.sidebar.firSidebar) {
      this.config.sidebar.firSidebar.width = this.isSidebarShrink ? SIZE.CLOSE_WIDTH : SIZE.OPEN_WIDTH;
    }
    this.config.sidebar.shrink = this.isSidebarShrink;
    this.layoutService.updateLayoutConfig(this.config);
  }
}
