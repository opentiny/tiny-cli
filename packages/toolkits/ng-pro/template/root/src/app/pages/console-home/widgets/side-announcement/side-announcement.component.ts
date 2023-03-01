import { Component } from '@angular/core';
import { NoticeUrl, NoticeI18nPrefix } from '@shared/tiny-pro';
interface ContentItem {
  url: string;
  time: string;
  typeName: string;
  title: string;
}

@Component({
  selector: 't-pro-side-announcement',
  templateUrl: './side-announcement.component.html',
  styleUrls: ['./side-announcement.component.scss'],
})
export class SideAnnouncementComponent {
  public portal: string = 'https://www.huaweicloud.com/notice.html';
  public contentList: Array<ContentItem> = [
    {
      url: `${NoticeUrl}`,
      time: '05-11',
      typeName: `${NoticeI18nPrefix}upgradeNotices`,
      title: `${NoticeI18nPrefix}conferenceNotice`,
    },
    {
      url: `${NoticeUrl}`,
      time: '05-10',
      typeName: `${NoticeI18nPrefix}productNotices`,
      title: `${NoticeI18nPrefix}adjustmentNotice`,
    },
    {
      url: `${NoticeUrl}`,
      time: '05-09',
      typeName: `${NoticeI18nPrefix}productNotices`,
      title: `${NoticeI18nPrefix}billNotice`,
    },
    {
      url: `${NoticeUrl}`,
      time: '05-06',
      typeName: `${NoticeI18nPrefix}upgradeNotices`,
      title: `${NoticeI18nPrefix}maintenanceNotice`,
    },
    {
      url: `${NoticeUrl}`,
      time: '05-06',
      typeName: `${NoticeI18nPrefix}upgradeNotices`,
      title: `${NoticeI18nPrefix}maintenanceNotice`,
    },
    {
      url: `${NoticeUrl}`,
      time: '05-06',
      typeName: `${NoticeI18nPrefix}upgradeNotices`,
      title: `${NoticeI18nPrefix}maintenanceNotice`,
    },
  ];
}
