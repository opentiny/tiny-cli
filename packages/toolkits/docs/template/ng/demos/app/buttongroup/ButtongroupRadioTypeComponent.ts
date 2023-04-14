import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-radio-type.html',
})
export class ButtongroupRadioTypeComponent {
  items: Array<TiButtonItem> = [
    {
      text: '北京市-昌平区',
    },
    {
      text: '西安市-雁塔区',
    },
    {
      text: '上海市-闵行区',
    },
    {
      text: '青岛市-市北区',
    },
  ];
  items1: Array<TiButtonItem> = this.items;
  items2: Array<TiButtonItem> = this.items;
  selected: TiButtonItem = this.items[2];
  selected1: TiButtonItem = this.items1[1];
  selected2: TiButtonItem = this.items2[3];
}
