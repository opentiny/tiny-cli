import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { Notification, NoticeData } from '../data/noticeData';
import { HeaderNoticeI18nPrefix } from '@shared/tiny-pro';

@Injectable()
export class NoticeDataService extends NoticeData {
  private notifications: Notification[] = [
    {
      id: '1',
      title: `${HeaderNoticeI18nPrefix}noticeTitle1`,
      time: `${HeaderNoticeI18nPrefix}time1`,
    },
    {
      id: '2',
      title: `${HeaderNoticeI18nPrefix}noticeTitle2`,
      time: `${HeaderNoticeI18nPrefix}time2`,
    },
    {
      id: '3',
      title: `${HeaderNoticeI18nPrefix}noticeTitle3`,
      time: `${HeaderNoticeI18nPrefix}time3`,
    },
    {
      id: '4',
      title: `${HeaderNoticeI18nPrefix}noticeTitle4`,
      time: `${HeaderNoticeI18nPrefix}time4`,
    },
    {
      id: '5',
      title: `${HeaderNoticeI18nPrefix}noticeTitle5`,
      time: `${HeaderNoticeI18nPrefix}time5`,
    },
  ];

  getNotifications(): Observable<Notification[]> {
    return observableOf(this.notifications);
  }
}
