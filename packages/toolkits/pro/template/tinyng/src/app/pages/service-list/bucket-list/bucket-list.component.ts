import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GuideheadConfig } from '../service-list.module';
import { BucketListHeadI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent {
  public bucketConfig: GuideheadConfig = {
    helptip: {
      label: '',
      iconTip: ''
    },
    buttons: [
      {
        id: '1',
        label: this.translate.instant(`${BucketListHeadI18nPrefix}creatBucket`),
        color: 'danger'
      },
      {
        id: '2',
        label: this.translate.instant(`${BucketListHeadI18nPrefix}buyPackages`)
      }
    ]
  };

  public feedbackList: Array<any> = [
    {
      icon: 'information-circle-outline',
      label: `${BucketListHeadI18nPrefix}openSourceNotice`
    },
    {
      icon: 'happy-outline',
      label: `${BucketListHeadI18nPrefix}evaluate`
    },
    {
      icon: 'paper-plane-outline',
      label: `${BucketListHeadI18nPrefix}processFlow`
    },
    {
      icon: 'book-outline',
      label: `${BucketListHeadI18nPrefix}help`
    },
    {
      icon: 'list-outline',
      label: `${BucketListHeadI18nPrefix}taskManage`
    }
  ];

  public flag: string = 'buckets';

  constructor(private translate: TranslateService) {}
}
