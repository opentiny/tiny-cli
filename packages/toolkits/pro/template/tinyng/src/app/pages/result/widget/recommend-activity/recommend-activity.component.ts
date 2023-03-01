import { Component } from '@angular/core';
import { ActivityHWCloudUrl, HWCloudUrl, AdvertiseUrlPrefix } from '../constants';

@Component({
  selector: 't-pro-recommend-activity',
  templateUrl: './recommend-activity.component.html',
  styleUrls: ['./recommend-activity.component.scss'],
})
export class RecommendActivityComponent {
  public recommends: Array<any> = [
    {
      href: `${ActivityHWCloudUrl}/dbs_free.html`,
      src: `${AdvertiseUrlPrefix}1623124260746037526.jpg`,
    },
    {
      href: `${HWCloudUrl}/product/domain.html`,
      src: `${AdvertiseUrlPrefix}1623124374358084687.jpg`,
    },
    {
      href: `${HWCloudUrl}/product/ecs.html`,
      src: `${AdvertiseUrlPrefix}1623124490397007126.jpg`,
    },
  ];
}
