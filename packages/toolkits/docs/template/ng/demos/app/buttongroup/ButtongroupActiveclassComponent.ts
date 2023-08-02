import { Component, ViewEncapsulation } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-activeclass.html',
  styleUrls: ['./buttongroup.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtongroupActiveclassComponent {
  items: Array<TiButtonItem> = [
    {
      text: '1G',
      disabled: true,
    },
    {
      text: '2G',
    },
    {
      text: '3G',
    },
    {
      text: '4G',
    },
  ];
  selected: TiButtonItem = this.items[2];
  activeClass: string = 'bgColor';

  radioChangeFn(item: TiButtonItem): void {
    console.log(item);
  }
}
