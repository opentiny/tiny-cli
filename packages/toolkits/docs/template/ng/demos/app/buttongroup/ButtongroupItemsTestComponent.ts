import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-items-test.html',
})
export class ButtongroupItemsTestComponent {
  items: Array<TiButtonItem>;
  selected: TiButtonItem;
  selected1: Array<TiButtonItem>;
  myLogs: Array<any> = [];

  setItems(): void {
    this.items = [
      {
        text: '1G',
      },
      {
        text: '2G',
      },
      {
        text: '3G',
      },
      {
        text: '4G',
        disabled: true,
      },
    ];
  }
  setModel(): void {
    this.selected = this.items[0];
  }
  clearModel(): void {
    this.selected = undefined;
  }
  setModel1(): void {
    this.selected1 = [this.items[0], this.items[2]];
  }
  clearModel1(): void {
    this.selected1 = undefined;
  }
  ngmodelChange($event): void {
    this.myLogs = [...this.myLogs, JSON.stringify($event)];
  }
}
