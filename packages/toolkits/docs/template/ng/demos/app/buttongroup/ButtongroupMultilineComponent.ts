import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-multiline.html',
})
export class ButtongroupMultilineComponent {
  items: Array<TiButtonItem> = [
    {
      text: '一月份',
    },
    {
      text: '二月份',
    },
    {
      text: '三月份',
    },
    {
      text: '四月份',
    },
    {
      text: '五月份',
    },
    {
      text: '六月份',
    },
    {
      text: '七月份',
    },
    {
      text: '八月份',
    },
    {
      text: '九月份',
    },
    {
      text: '十月份',
    },
    {
      text: '十一月份',
    },
    {
      text: '十二月份',
    },
  ];
  selected: TiButtonItem = this.items[2];
}
