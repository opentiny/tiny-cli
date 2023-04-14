import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-template.html',
})
export class ButtongroupTemplateComponent {
  items: Array<TiButtonItem> = [
    {
      iconName: 'discount',
      title: '优惠价格：200',
    },
    {
      iconName: 'calendar',
      title: '日期',
    },
    {
      iconName: 'config',
      title: '默认配置',
    },
    {
      iconName: 'search',
      title: '搜索',
    },
  ];
  items1: Array<TiButtonItem> = this.items;
  selected: TiButtonItem = this.items[2];
  selected1: Array<TiButtonItem> = [this.items1[2], this.items1[3]];
}
