import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-focus.html',
})
export class ButtongroupFocusComponent {
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
    {
      text: '星期四1',
    },
    {
      text: '星期四2',
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
    this.myLogs = [...this.myLogs, 'focus：单选按钮聚焦，tabindex=2'];
  }
  blur(): void {
    this.myLogs = [...this.myLogs, 'blur：单选按钮失焦'];
  }
  focus1(): void {
    this.myLogs = [...this.myLogs, 'focus：多选按钮聚焦，tabindex=1'];
  }
  blur1(): void {
    this.myLogs = [...this.myLogs, 'blur：多选按钮失焦'];
  }
}
