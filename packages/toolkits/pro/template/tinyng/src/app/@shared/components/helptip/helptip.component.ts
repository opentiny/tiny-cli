import { Component, Input } from '@angular/core';

@Component({
  selector: 't-pro-helptip',
  templateUrl: './helptip.component.html',
  styleUrls: ['./helptip.component.scss'],
})
export class HelpTipComponent {
  // 待解释的的文本内容
  @Input() label: string;
  // 提示说明文本，可为字符串
  @Input() iconTip: string | any;
  // 提示说明方向
  @Input() iconTipPosition: string | any;
}
