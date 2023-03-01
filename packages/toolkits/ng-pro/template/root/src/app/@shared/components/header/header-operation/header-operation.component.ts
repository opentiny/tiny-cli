import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { LANGUAGES } from '@config/tiny-pro';
import { User } from '../../../models/user';

@Component({
  selector: 't-pro-header-operation',
  templateUrl: './header-operation.component.html',
  styleUrls: ['./header-operation.component.scss'],
})
export class HeaderOperationComponent implements OnInit {
  @Input() shrink: boolean = false;
  user: User;
  languages = LANGUAGES;
  language: string;
  haveLoggedIn: boolean = false;
  noticeCount: number;
  curLang: string = '';
  isShowNoticeModal: boolean = false;
  isLeaveModal: boolean = false;
  helpCenter: string = '/ng-pro/docs/';

  constructor(private route: Router, private authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userinfo')) {
      this.user = JSON.parse(localStorage.getItem('userinfo')!);
      this.haveLoggedIn = true;
    } else {
      this.authService.login('Admin', 'TinyUI.admin').subscribe((res) => {
        this.authService.setSession(res);
        this.user = JSON.parse(localStorage.getItem('userinfo')!);
        this.haveLoggedIn = true;
      });
    }
    this.language = this.translate.currentLang;

    LANGUAGES.forEach((item) => {
      if (item.code === this.language) {
        this.curLang = item.lang;
      }
    });
  }

  onSearch(event: any) {
    console.log(event);
  }

  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    location.reload();
  }

  handleUserOps(operation: string) {
    switch (operation) {
      case 'logout': {
        this.haveLoggedIn = false;
        this.authService.logout();
        this.route.navigate(['/', 'login']);
        break;
      }
      default:
        break;
    }
  }

  handleNoticeCount(event: number) {
    this.noticeCount = event;
  }

  parentStatus(status: boolean) {
    this.isLeaveModal = status;
  }

  showNoticeModal(isShow: boolean) {
    if (isShow) {
      this.isShowNoticeModal = true;
    } 
    else if (!isShow && !this.isLeaveModal) {
      this.isShowNoticeModal = false;
    }
  }
}
