import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@shared/tiny-pro';
import { AuthService } from 'src/app/@core/services/auth.service';
@Component({
  selector: 't-pro-user-info-head',
  templateUrl: './user-info-head.component.html',
  styleUrls: ['./user-info-head.component.scss'],
})
export class UserInfoHeadComponent implements OnInit {
  user!: User;

  public authStatusLabel: string = this.translate.instant('consoleHome.userInfo.realNameAuthSuccess');

  constructor(private authService: AuthService, private translate: TranslateService) {}

  ngOnInit(): void {
    if (localStorage.getItem('userinfo')) {
      this.user = JSON.parse(localStorage.getItem('userinfo')!);
    } else {
      this.authService.login('Admin', 'TinyUI.admin').subscribe((res: any) => {
        this.authService.setSession(res);
        this.user = JSON.parse(localStorage.getItem('userinfo')!);
      });
    }
  }
}
