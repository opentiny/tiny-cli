import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-id.html',
})
export class ButtongroupIdComponent {
  items: Array<TiButtonItem> = [
    {
      id: 'changpingqu',
      text: '北京市-昌平区',
      disabled: true,
    },
    {
      id: 'yantaqu',
      text: '西安市-雁塔区',
    },
    {
      id: 'minhangqu',
      text: '上海市-闵行区',
    },
    {
      id: 'shibeiqu',
      text: '青岛市-市北区',
    },
  ];
  selected: TiButtonItem = this.items[2];
  selected1: Array<TiButtonItem> = [this.items[2], this.items[3]];
  constructor(private hostRef: ElementRef, private cdRef: ChangeDetectorRef) {}
  idArray1 = [];
  idArray2 = [];
  ngAfterViewInit(): void {
    // 为了在页面上显示id，没有实际意义
    const tiButtongroup1: Element = this.hostRef.nativeElement.querySelectorAll('ti-button-group')[0];
    const tiButtongroup2: Element = this.hostRef.nativeElement.querySelectorAll('ti-button-group')[1];
    this.items.forEach(item => {
      this.idArray1.push(tiButtongroup1.id + `_${item.id}`);
      this.idArray2.push(tiButtongroup2.id + `_${item.id}`);
    });
    this.cdRef.detectChanges();
  }
}
