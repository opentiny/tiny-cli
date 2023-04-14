import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-event.html',
})
export class ButtongroupEventComponent {
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
  items1: Array<TiButtonItem> = [
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
    },
  ];
  selected: TiButtonItem = this.items[1];
  selected1: Array<TiButtonItem> = [this.items1[3]];
  myLogs: Array<any> = [];
  focus(): void {
    this.myLogs = [...this.myLogs, 'focus'];
  }
  blur(): void {
    this.myLogs = [...this.myLogs, 'blur'];
  }
  modelChange($event: TiButtonItem): void {
    this.myLogs = [...this.myLogs, JSON.stringify($event)];
  }
}
