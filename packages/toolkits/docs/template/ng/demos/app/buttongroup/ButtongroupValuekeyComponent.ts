import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-valuekey.html',
})
export class ButtongroupValuekeyComponent {
  items: Array<TiButtonItem> = [
    {
      text: '近1小时',
      english: 'about 1hour',
    },
    {
      text: '近12小时',
      english: 'about 12hour',
    },
    {
      text: '近1天',
      english: 'about 1day',
    },
    {
      text: '近3天',
      english: 'about 3day',
    },
  ];
  items1: Array<TiButtonItem> = this.items;
  selected: string = 'about 1day';
  selected1: Array<string> = ['about 12hour', 'about 1day'];
}
