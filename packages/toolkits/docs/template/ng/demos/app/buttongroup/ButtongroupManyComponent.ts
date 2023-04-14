import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-many.html',
})
export class ButtongroupManyComponent {
  items: Array<TiButtonItem> = [
    {
      text: '星期一',
      disabled: true,
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
      text: '星期五',
    },
    {
      text: '星期六',
    },
    {
      text: '星期七',
    },
    {
      text: '星期八',
    },
    {
      text: '星期九',
    },
    {
      text: '星期十',
    },
    {
      text: '星期零',
    },
  ];
  items1: Array<TiButtonItem> = [
    {
      text: '这是超过300px的文本1，超长出点点点，hover上去显示tip',
      disabled: true,
    },
    {
      text: '这是超过300px的文本2，超长出点点点，hover上去显示tip',
    },
    {
      text: '这是超过300px的文本3，超长出点点点，hover上去显示tip',
    },
    {
      text: '这是超过300px的文本4，超长出点点点，hover上去显示tip',
    },
  ];
  items2: Array<TiButtonItem> = [
    {
      text: '通用计算型',
    },
    {
      text: '通用计算增强型',
    },
    {
      text: '内存优化型',
    },
    {
      text: '高性能计算型',
    },
    {
      text: '磁盘增强型',
      disabled: true,
    },
  ];
  selected: TiButtonItem = this.items[2];
  selected1: TiButtonItem = this.items1[1];
  selected2: TiButtonItem = this.items2[3];
}
