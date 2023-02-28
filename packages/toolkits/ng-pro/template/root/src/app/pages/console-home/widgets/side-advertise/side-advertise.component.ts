import { Component } from '@angular/core';

@Component({
  selector: 't-pro-side-advertise',
  templateUrl: './side-advertise.component.html',
  styleUrls: ['./side-advertise.component.scss'],
})
export class SideAdvertiseComponent {
  // 广告位链接 && 图片地址
  public href: string = 'https://www.huaweicloud.com/mobile_app/hwapp.html?channel=console_banner&ggw_hd';
  public src: string =
    'https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/advertisement/Smart/49APP/1630378504659009954.png';
}
