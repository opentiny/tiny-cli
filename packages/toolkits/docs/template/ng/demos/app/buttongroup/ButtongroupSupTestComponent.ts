import { Component, ViewEncapsulation } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-sup-test.html',
  encapsulation: ViewEncapsulation.None,
})
export class ButtongroupSupTestComponent {
  values: Array<TiButtonItem> = [
    {
      text: '9个月',
      sup: {
        class: 'ti3-icon ti3-icon-sold-out buttongroup-sold-out', // 10.1.2版本之后可通过自定义模板设置图标及样式
      },
    },
    {
      text: '1年',
      sup: {
        class: 'ti3-icon ti3-icon-discount-sup buttongroup-discount-icon',
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
  selected: TiButtonItem = this.values[1];
}
