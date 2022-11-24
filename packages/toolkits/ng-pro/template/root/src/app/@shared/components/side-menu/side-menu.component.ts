import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TProLayoutService, TProLayoutConfig } from '../layouts/index';
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
  public active: any;
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

    return width + 'px';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleClick(isHide: boolean): void {
    this.isSidebarShrink = isHide;

    if (this.config.sidebar.firSidebar) {
      this.config.sidebar.firSidebar.width = this.isSidebarShrink ? 54 : 240;
    }
    this.config.sidebar.shrink = this.isSidebarShrink;
    this.layoutService.updateLayoutConfig(this.config);
  }
}
