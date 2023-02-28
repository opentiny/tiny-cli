import { Component } from '@angular/core';
import { RegionI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-header-left-menu',
  templateUrl: './header-left-menu.component.html',
  styleUrls: ['./header-left-menu.component.scss'],
})
export class HeaderLeftMenuComponent {
  public originalData: any = [
    { label: `${RegionI18nPrefix}cnNorth4` },
    { label: `${RegionI18nPrefix}cnNorth5` },
    { label: `${RegionI18nPrefix}cnEast3` },
    { label: `${RegionI18nPrefix}cnSouth1` },
    { label: `${RegionI18nPrefix}cnSouthwest2` },
  ];
  public regionItems: Array<any> = this.originalData;

  public selectedRegion: any = this.originalData[0];

  public regionChange($event: any): void {
    this.selectedRegion = $event;
  }
}
