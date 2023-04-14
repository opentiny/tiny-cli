import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-multiple.html',
})
export class ButtongroupMultipleComponent {
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
  selected: Array<TiButtonItem> = [this.items[2], this.items[3]];
}
