import { Component } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';
import { ImageI18nPrefix, ImgAddrPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-service-image',
  templateUrl: './service-image.component.html',
  styleUrls: ['./service-image.component.scss'],
})
export class ServiceImageComponent {
  public imageOptions: Array<TiButtonItem> = [
    {
      text: `${ImageI18nPrefix}system`,
      value: 'system',
    },
    {
      text: `${ImageI18nPrefix}market`,
      value: 'market',
    },
  ];

  public imageModel: any = [
    {
      title: 'CentOS',
      isChecked: false,
      url: `${ImgAddrPrefix}/CentOS.png`,
      osList: [
        {
          label: '8.2 64bit',
        },
        {
          label: '8.1 64bit',
        },
        {
          label: '8.0 64bit',
        },
      ],
      value: '8.2 64bit'
    },
    {
      title: 'Ubuntu',
      isChecked: false,
      url: `${ImgAddrPrefix}/Ubuntu.png`,
      osList: [
        {
          label: '18.04 server 64bit',
        },
        {
          label: '16.04 server 64bit',
        },
      ],
      value: '18.04 server 64bit'
    },
    {
      title: 'Windows',
      isChecked: false,
      url: `${ImgAddrPrefix}/Windows.png`,
      osList: [
        {
          label: '18.04 server 64bit',
        },
        {
          label: '16.04 server 64bit',
        },
      ],
      value: '18.04 server 64bit'
    },
  ];

  public selectedImageType: TiButtonItem = this.imageOptions[0];

  public securityServiceLabel: string = 'servicePurchase.image.hostSecurityService';

  public alarmLabel: string = 'servicePurchase.image.oneClickAlarm';

  public imageClick(image: any) {
  
    // 配置只支持单选
    for (let i = 0; i < this.imageModel.length; i++) {
        this.imageModel[i].isChecked = false;
    }
    image.isChecked = !image.isChecked;
  }
}
