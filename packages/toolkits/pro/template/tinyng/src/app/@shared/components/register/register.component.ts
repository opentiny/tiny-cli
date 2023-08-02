import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TiMessageService, TiValidators, TiValidationConfig } from '@opentiny/ng';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { LANGUAGES } from '@config/tiny-pro';
import { DefaultTheme } from '../../models/theme';

@Component({
  selector: 't-pro-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private destroy$ = new Subject();

  language: string;
  i18nValues: any;
  languages = LANGUAGES;
  alertOpen: boolean = false;
  typePrompt: 'error' | 'warn' | 'prompt' | 'simple' = 'prompt';

  formData = {
    userEmail: '',
    password: '',
    confirmPassword: '',
  };
  registerForm: FormGroup;
  validationBlur: TiValidationConfig = {
    type: 'blur',
  };
  validationPwd: TiValidationConfig = {
    type: 'password',
  };

  constructor(
    private route: Router,
    private translate: TranslateService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private tiMessageService: TiMessageService,
    private personalizeService: PersonalizeService
  ) {
    this.registerForm = this.fb.group({
      userEmail: new FormControl(this.formData.userEmail, [TiValidators.required, TiValidators.email]),
      password: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.registerForm.get('userEmail') as AbstractControl;
          },
        }),
      ]),
      confirmPassword: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.registerForm.get('userEmail') as AbstractControl;
          },
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.translate
      .get('registerPage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.i18nValues = this.translate.instant('registerPage');
      });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: TranslationChangeEvent) => {
      this.i18nValues = this.translate.instant('registerPage');
    });
    this.language = this.translate.currentLang;

    const theme = localStorage.getItem('t-pro-theme') ? JSON.parse(localStorage.getItem('t-pro-theme')!) : DefaultTheme;
    this.personalizeService.changeTheme(theme.id);
  }

  register(event: any) {
    let errors: ValidationErrors | null = TiValidators.check(this.registerForm);
    // 整体校验后如果需要聚焦到第一个校验不通过元素，请参考以下代码
    if (errors) {
      // 注意：要保证fb.group时各个FormControl的顺序与对应表单元素dom放置顺序一致
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[formControlName=${firstError}]`).focus();
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.alertOpen = true;
      this.typePrompt = 'error';
      return;
    }

    const results = this.tiMessageService.open({
      title: this.i18nValues.resultMessage.title,
      content: this.i18nValues.resultMessage.content,
      context: {
        contentName: this.i18nValues.resultMessage.content,
      },
      okButton: {
        show: true, // 是否显示, 默认是true
        disabled: false, // 是否禁用，默认是false
        primary: true, // 是否为主按钮，主按钮为较醒目的按钮样式。默认okButton为主要按钮
        text: '确定', // 按钮文本，默认okButton为确认/OK（国际化），cancelButton为取消/Cancel（国际化）
        autofocus: true, // 是否自动聚焦，默认okbutton自动聚焦
        click: (): void => {
          // 在这里可以添加你的业务代码
          // 使用按钮自定义click时，需要显式调用close或者dismiss
          this.goToLogin(results);
          // 在这里也可以添加你的业务代码
        },
      },
      cancelButton: {
        // 取消按钮的设置和okbutton的属性设置是一致的，参考okbutton设置即可。
        show: false, // 是否显示，默认是true
      },
    });
  }

  goToLogin(dialogResult: any) {
    dialogResult.close();
    this.route.navigate(['/login']);
  }

  onLanguageClick(language: string) {
    this.language = language;
    localStorage.setItem('lang', this.language);
    this.translate.use(this.language);
  }

  sameToPassWord(value: string) {
    return value === this.formData.password;
  }
}
