import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-multi-type.html',
})
export class ButtongroupMultiTypeComponent {
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
  selected: Array<TiButtonItem> = [this.items[1], this.items[3]];
  selected1: Array<TiButtonItem> = [this.items1[2], this.items1[3]];
}
