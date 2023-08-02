import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-disabled.html',
})
export class ButtongroupDisabledComponent {
  disabled: boolean = true;
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

  items1: Array<TiButtonItem> = this.items;
  selected: TiButtonItem = this.items[2];
  selected1: TiButtonItem = this.items1[0];
  selected2: Array<TiButtonItem> = [this.items[2]];
}
