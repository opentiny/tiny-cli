import { Component, EventEmitter, OnInit, Input, Output, ViewChild, SimpleChanges, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiHalfmodalComponent, TiTipDirective  } from '@opentiny/ng';
import { TProTranslatePipe } from '@shared/tiny-pro';
import { Notification } from 'src/app/@core/data/noticeData';
import { NoticeDataService } from 'src/app/@core/mock/notice-data.service';

@Component({
  selector: 't-pro-header-notice',
  templateUrl: './header-notice.component.html',
  styleUrls: ['./header-notice.component.scss'],
})
export class HeaderNoticeComponent implements OnInit {
  @ViewChild('modal', { static: true }) halfmodal: TiHalfmodalComponent;
  @ViewChild('text', { static: true }) textList: ElementRef;
  @ViewChildren('tip') tipDirective: QueryList<TiTipDirective>;

  @Input() show: boolean = false;
  @Output() showStatus = new EventEmitter<boolean>();
  @Output() countEvent = new EventEmitter<number>();

  notifications: Notification[] = [];
  public tipSwitch: boolean = false;
  public textEnd:string = this.translate.instant('notice.extend');
  public modalStatus: boolean = true;

  constructor(
    private noticeService: NoticeDataService,
    private translate: TranslateService,
    private tProTrans: TProTranslatePipe,
  ) { }

  ngOnInit() {
    this.noticeService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
      this.tProTrans.transform(this.notifications);
    });
    setTimeout(() => {
      this.countEvent.emit(this.notifications.length);
    });
  }

  onMouseAction(index:number): void {
    this.tipDirective.forEach((v:any,i:number) => {
      if (index === i) {
        if (this.tipSwitch) {
          this.tipSwitch= false;
          v.hide();
          setTimeout(()=>{
            this.toParentStatus(this.tipSwitch)
          })
        } else {
          this.tipSwitch= true;
          this.toParentStatus(this.tipSwitch)
          v.show();
        }
      }
    });
  }

  switchTab() {
    if (this.modalStatus) {
      this.halfmodal.nativeElement.classList.remove('close-container');
      this.textList.nativeElement.classList.remove('close-text');
      this.textEnd = this.translate.instant('notice.close');
      this.modalStatus = false;
    } else {
      this.halfmodal.nativeElement.classList.add('close-container');
      this.textList.nativeElement.classList.add('close-text');
      this.textEnd = this.translate.instant('notice.extend');
      this.modalStatus = true;
    }
  }

  toParentStatus(status: boolean) {
    this.showStatus.emit(status)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.show?.currentValue) {
      this.halfmodal.show();
    } else {
      this.halfmodal.hide();
    }
  }
}
