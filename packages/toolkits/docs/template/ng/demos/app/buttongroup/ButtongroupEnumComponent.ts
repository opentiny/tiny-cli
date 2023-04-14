import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

enum TimeLength {
  about1hour,
  about12hour,
  about1day,
  about3day,
}

@Component({
  templateUrl: './buttongroup-enum.html',
})
export class ButtongroupEnumComponent {
  items: Array<TiButtonItem> = [
    {
      text: '近1小时',
      english: TimeLength.about1hour,
    },
    {
      text: '近12小时',
      english: TimeLength.about12hour,
    },
    {
      text: '近1天',
      english: TimeLength.about1day,
    },
    {
      text: '近3天',
      english: TimeLength.about3day,
    },
  ];
  selected: TimeLength = TimeLength.about1hour;
  selecteds: Array<TimeLength> = [TimeLength.about1hour, TimeLength.about12hour];
}
