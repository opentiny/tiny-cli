import { Component, OnInit } from '@angular/core';
import { PersonalizeService } from 'src/app/@core/services/personalize.service';
import { CustomThemeService } from 'src/app/@core/services/custom-theme.service';
import { ThemeType, ThemeColors, DefaultTheme } from '../../models/theme';

@Component({
  selector: 't-pro-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.scss'],
})
export class PersonalizeComponent implements OnInit {
  public customColor: string = '';
  public customDark: boolean = false;
  public themeType: any = ThemeType;
  public currentTheme: any;
  public configs: any[] = [];
  public themeColors: any = ThemeColors;

  public currentValue: any = {
    themes: localStorage.getItem('t-pro-theme')
      ? JSON.parse(localStorage.getItem('t-pro-theme')!)
      : DefaultTheme,
  };

  constructor(
    private personalizeService: PersonalizeService,
    private customThemeService: CustomThemeService
  ) {
    this.customColor = DefaultTheme.brand;
    this.customDark = DefaultTheme.isDark;
  }

  ngOnInit() {
    this.configs = this.personalizeService.configs;
    this.getCustomColor();
  }

  onChange(type: string, value: any) {
    if (type === 'themes') {
      this.currentTheme = value;
      this.personalizeService.changeTheme(value);
    }
  }

  getCustomColor() {
    const customThemeConfig = localStorage.getItem('t-pro-theme');

    if (customThemeConfig) {
      const { custom } = JSON.parse(customThemeConfig);
      if (!custom.brand && !custom.isDark) return;

      this.customColor = custom.brand;
      this.customDark = custom.isDark;
    }
  }

  selectColor(color: string, theme: any) {
    this.customColor = color;
    this.customDark = theme.isDark;
    this.currentValue.themes.id = ThemeType.Custom;
    this.currentTheme = ThemeType.Custom;

    this.customThemeService.changeCustomTheme(color, theme.isDark);
  }
}
