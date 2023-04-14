import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-beforeclick.html',
})
export class ButtongroupBeforeclickComponent {
  items: Array<TiButtonItem> = [
    {
      text: '近1小时',
      disabled: true,
    },
    {
      text: '近12小时',
    },
    {
      text: '近1天',
    },
    {
      text: '近3天',
    },
  ];
  items1: Array<TiButtonItem> = this.items;
  selected: TiButtonItem = this.items[2];
  selected1: Array<TiButtonItem> = [this.items1[2]];
  myLogs: Array<any> = [];

  beforeClickFn1(event): void {
    if (this.items.indexOf(event) > 1) {
      this.selected = event;
      this.myLogs = [...this.myLogs, `${event.text}---被点击`];

      return;
    }
    this.myLogs = [...this.myLogs, `${event.text}---被点击但被阻止选中`];
  }
  beforeClickFn2(event): void {
    if (this.items1.indexOf(event) > 1) {
      if (this.selected1.includes(event)) {
        this.selected1.splice(this.selected1.indexOf(event), 1);
      } else {
        this.selected1.push(event);
        this.selected1 = this.selected1.concat();
      }
      this.myLogs = [...this.myLogs, `${event.text}---被点击`];

      return;
    }
    this.myLogs = [...this.myLogs, `${event.text}---被点击但被阻止选中`];
  }
}
