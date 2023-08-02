import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-deselectable.html',
})
export class ButtongroupDeselectableComponent {
  items: Array<TiButtonItem> = [
    {
      text: '星期一',
    },
    {
      text: '星期二',
    },
    {
      text: '星期三',
    },
    {
      text: '星期四',
    },
  ];
  selected: TiButtonItem = this.items[1];
}
