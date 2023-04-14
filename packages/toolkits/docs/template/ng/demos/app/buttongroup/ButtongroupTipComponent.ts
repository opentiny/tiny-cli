import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-tip.html',
})
export class ButtongroupTipComponent {
  @ViewChild('tip', { static: true }) tip: TemplateRef<any>;
  items: Array<TiButtonItem> = [];
  items1: Array<TiButtonItem> = [];
  selected: TiButtonItem;
  selected1: Array<TiButtonItem>;

  ngOnInit(): void {
    this.items = [
      {
        text: '配置提示内容',
        tipContent: this.tip,
        tipPosition: 'top-left',
      },
      {
        text: '配置提示内容',
        tipContent: 'string类型的提示',
        tipPosition: 'left',
      },
      {
        text: '禁用且配置提示内容',
        disabled: true,
        tipContent: this.tip,
      },
    ];
    this.items1 = [
      {
        text: '配置提示内容',
        tipContent: 'string类型的提示',
      },
      {
        text: '配置提示内容',
        tipContent: this.tip,
      },
      {
        text: '禁用且配置提示内容',
        disabled: true,
        tipContent: this.tip,
      },
    ];

    this.selected = this.items[1];
    this.selected1 = [this.items1[1]];
  }
}
