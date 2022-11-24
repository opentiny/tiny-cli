import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TiValidators, TiValidationConfig } from '@opentiny/ng';
import { AuthService } from 'src/app/@core/services/auth.service';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { LANGUAGES } from 'src/config/language-config';
import { environment } from 'src/environments/environment';
import { DefaultTheme } from '../../models/theme';

@Component({
  selector: 't-pro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject();

  tabActiveId: string | number = 'accountTab';
  autoLoginState: boolean = true;

  tabItems: any;
  language: string;
  i18nValues: any;
  toastMessage: string;
  typePrompt: 'success' | 'error' | 'warn' | 'prompt' | 'simple' = 'prompt';
  alertOpen: boolean = false;
  languages = LANGUAGES;

  formData = {
    userAccount: 'Admin',
    userAccountPassword: 'TinyUIPro.admin',
    userEmail: 'admin@tinyuipro.com',
    userEmailPassword: 'TinyUIPro.admin',
  };

  userNameForm: FormGroup;
  emailForm: FormGroup;
  validationBlur: TiValidationConfig = {
    type: 'blur',
  };
  validationPwd: TiValidationConfig = {
    type: 'password',
  };

  @HostListener('window:keydown.enter')
  onEnter() {
    this.onClick(this.tabActiveId);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private personalizeService: PersonalizeService
  ) {
    this.language = this.translate.currentLang;
    this.userNameForm = this.fb.group({
      userAccount: new FormControl(this.formData.userAccount, [TiValidators.required]),
      userAccountPassword: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.userNameForm.get('userAccount') as AbstractControl;
          },
        }),
      ]),
    });

    this.emailForm = this.fb.group({
      userEmail: new FormControl(this.formData.userEmail, [TiValidators.required]),
      userEmailPassword: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.emailForm.get('userEmail') as AbstractControl;
          },
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.translate
      .get('loginPage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.i18nValues = this.translate.instant('loginPage');
        this.updateTabItems(res);
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: TranslationChangeEvent) => {
      this.i18nValues = this.translate.instant('loginPage');
      this.updateTabItems(this.i18nValues);
    });

    const theme = localStorage.getItem('t-pro-theme') ? JSON.parse(localStorage.getItem('t-pro-theme')!) : DefaultTheme;

    this.personalizeService.changeTheme(theme.id);

    // oauth认证回调
    this.route.queryParams.pipe(map((param) => param.code)).subscribe((code) => {
      if (code && code.length > 0) {
        setTimeout(() => {
          this.toastMessage = this.i18nValues['callbackMessage'];
          this.typePrompt = 'success';
          this.alertOpen = true;
        });
      }
    });
  }

  onClick(tabId: string | number) {
    const errors: ValidationErrors | null = TiValidators.check(
      tabId === 'accountTab' ? this.userNameForm : this.emailForm
    );
    // 整体校验后如果需要聚焦到第一个校验不通过元素，请参考以下代码
    if (errors) {
      // 注意：要保证fb.group时各个FormControl的顺序与对应表单元素dom放置顺序一致
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[formControlName=${firstError}]`).focus();
      return;
    }

    const account =
      tabId === 'accountTab' ? this.userNameForm.controls.userAccount.value : this.emailForm.controls.userEmail.value;
    const password =
      tabId === 'accountTab'
        ? this.userNameForm.controls.userAccountPassword.value
        : this.emailForm.controls.userEmailPassword.value;

    this.authService.login(account, password).subscribe(
      (res) => {
        this.authService.setSession(res);
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastMessage =
          tabId === 'accountTab'
            ? this.i18nValues['noticeMessage']['accountContent']
            : this.i18nValues['noticeMessage']['emailContent'];
        this.typePrompt = 'error';
        this.alertOpen = true;
      }
    );
  }

  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    this.translate.use(this.language);
  }

  updateTabItems(values: any) {
    this.tabItems = [
      {
        id: 'accountTab',
        title: values['loginWays']['account'],
        active: true,
      },
      {
        id: 'emailTab',
        title: values['loginWays']['email'],
        active: false,
      },
    ];
  }

  onKeyUp(e: KeyboardEvent, tabId: string | number) {
    if (e.keyCode === 13) {
      this.onClick(tabId);
    }
  }

  handleAuth(type: string) {
    // TODO: 此处后续github仓库建立之后需要修改
    const config = {
      oauth_uri: 'https://github.com/login/oauth/authorize',
      redirect_uri: '/',
      client_id: 'ef3ce924fcf915c50910',
    };
    if (!environment.production) {
      config.redirect_uri = 'http://localhost:8001/login';
      config.client_id = 'ecf5e43d804e8e003196';
    }
    window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
  }

  onActiveChange(isActive: boolean, id: string): void {
    if (isActive) {
      this.tabActiveId = id;
    }
  }
}
