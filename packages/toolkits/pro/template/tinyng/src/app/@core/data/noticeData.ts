import { Observable } from 'rxjs';

export interface Notification {
  title: string;
  time: string;
  id: string;
}
export abstract class NoticeData {
  abstract getNotifications(): Observable<Notification[]>;
}
