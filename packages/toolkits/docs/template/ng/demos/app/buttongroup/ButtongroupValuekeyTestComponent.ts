import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-valuekey-test.html',
})
export class ButtongroupValuekeyTestComponent {
  items: Array<TiButtonItem> = [
    {
      text: '近1小时',
      english: 'about 1hour',
      disabled: true,
    },
    {
      text: '近12小时',
      english: 'about 12hour',
    },
    {
      text: '近1天',
      english: 'about 1day',
    },
    {
      text: '近3天',
      english: 'about 3day',
    },
  ];
  items1: Array<TiButtonItem> = [
    {
      text: '这是超过300px的文本1，超长出点点点，hover上去显示tip',
      english: 'text1',
      disabled: true,
    },
    {
      text: '这是超过300px的文本2，超长出点点点，hover上去显示tip',
      english: 'text2',
    },
    {
      text: '这是超过300px的文本3，超长出点点点，hover上去显示tip',
      english: 'text3',
    },
    {
      text: '这是超过300px的文本4，超长出点点点，hover上去显示tip',
      english: 'text4',
    },
  ];
  selected: string = 'about 1day';
  selected1: Array<string> = ['text2', 'text3'];
  changeItems(): void {
    this.items = [
      {
        text: '近1小时',
        english: 'about 1hour',
        disabled: true,
      },
      {
        text: '近12小时',
        english: 'about 12hour',
      },
      {
        text: '近1天',
        english: 'about 1day',
      },
    ];
    this.items1 = [
      {
        text: '北京市-昌平区',
        english: 'text1',
        disabled: true,
      },
      {
        text: '西安市-雁塔区',
        english: 'text2',
      },
      {
        text: '上海市-闵行区',
        english: 'text3',
      },
    ];
  }
}
