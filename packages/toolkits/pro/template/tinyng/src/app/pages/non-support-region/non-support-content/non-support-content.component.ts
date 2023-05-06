import { Component, OnInit } from '@angular/core';
import { RegionI18nPrefix, TProTranslatePipe } from '@shared/tiny-pro';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 't-pro-non-support-content',
  templateUrl: './non-support-content.component.html',
  styleUrls: ['./non-support-content.component.scss'],
})
export class NonSupportContentComponent implements OnInit {
  private selectedRegionEvent: any;
  public regionData: any = {
    region: {
      displayName: this.translate.instant(`${RegionI18nPrefix}mexico1`),
    },
    supportRegions: [
      { displayName: `${RegionI18nPrefix}cnNorth4` },
      { displayName: `${RegionI18nPrefix}cnNorth5` },
      { displayName: `${RegionI18nPrefix}cnEast3` },
      { displayName: `${RegionI18nPrefix}cnSouth1` },
      { displayName: `${RegionI18nPrefix}cnSouthwest2` },
    ],
  };
  constructor(private translate: TranslateService, private tProTrans: TProTranslatePipe) {}

  ngOnInit(): void {
    this.tProTrans.transform(this.regionData.supportRegions);
  }

  onClick(item: any): void {
    if (!this.selectedRegionEvent) {
      this.selectedRegionEvent = document.createEvent('HTMLEvents');
      this.selectedRegionEvent.initEvent('cfChangeRegion', true, true);
    }

    this.selectedRegionEvent.detail = item;
    document.dispatchEvent(this.selectedRegionEvent);
  }

  onClickIcon(event: Event, item: any): void {
    item.showProjectsList = !item.showProjectsList;
  }
}
