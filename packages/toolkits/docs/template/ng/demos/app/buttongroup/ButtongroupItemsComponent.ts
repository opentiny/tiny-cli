import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-items.html',
})
export class ButtongroupItemsComponent {
  items: Array<TiButtonItem> = [
    {
      text: '1 hour',
    },
    {
      text: '12 hours',
    },
    {
      text: '1 day',
    },
    {
      text: '3 days',
    },
  ];
  selected: TiButtonItem = this.items[2];
}
