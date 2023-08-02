import { Component, ViewEncapsulation } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-sup.html',
  encapsulation: ViewEncapsulation.None,
})
export class ButtongroupSupComponent {
  items: Array<TiButtonItem> = [
    {
      text: '9个月',
      sup: {
        class: 'buttongroup-sold-out',
        iconName: 'sold-out',
      },
    },
    {
      text: '1年',
      sup: {
        class: 'buttongroup-discount-icon',
        iconName: 'discount-sup',
      },
    },
    {
      text: '2年',
      sup: {
        text: '88折',
        class: 'buttongroup-discount-text',
      },
    },
    {
      text: '3年',
      sup: {
        text: '7折',
        class: 'buttongroup-discount-text',
      },
    },
  ];
  selected: TiButtonItem = this.items[1];
}
