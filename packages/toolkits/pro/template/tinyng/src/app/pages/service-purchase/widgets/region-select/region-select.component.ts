import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';
import { RegionI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.scss'],
})
export class RegionSelectComponent {
  public regionOptions: Array<TiButtonItem> = [
    {
      text: `${RegionI18nPrefix}cnNorth4`,
      value: 'cnNorth4',
    },
    {
      text: `${RegionI18nPrefix}cnNorth5`,
      value: 'cnNorth5',
    },
    {
      text: `${RegionI18nPrefix}cnEast3`,
      value: 'cnEast3',
    },
    {
      text: `${RegionI18nPrefix}cnSouth1`,
      value: 'cnSouth1',
    },
    {
      text: `${RegionI18nPrefix}cnSouthwest2`,
      value: 'cnSouthwest2',
    },
  ];

  public selectedRegion: TiButtonItem = this.regionOptions[0];
}
