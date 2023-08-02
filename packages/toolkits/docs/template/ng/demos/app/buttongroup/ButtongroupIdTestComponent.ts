import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  templateUrl: './buttongroup-id-test.html',
})
export class ButtongroupIdTestComponent {
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
  idArray1: Array<string> = [];
  idArray2: Array<string> = [];
  ngAfterViewInit(): void {
    const tiButtongroup1: Element = this.hostRef.nativeElement.querySelectorAll('ti-button-group')[0];
    const tiButtongroup2: Element = this.hostRef.nativeElement.querySelectorAll('ti-button-group')[1];
    tiButtongroup1.querySelectorAll('.ti3-btn-item-container').forEach((item: Element) => {
      this.idArray1.push(item.id);
    });
    tiButtongroup2.querySelectorAll('.ti3-btn-item-container').forEach((item: Element) => {
      this.idArray2.push(item.id);
    });
    this.cdRef.detectChanges();
  }
}
