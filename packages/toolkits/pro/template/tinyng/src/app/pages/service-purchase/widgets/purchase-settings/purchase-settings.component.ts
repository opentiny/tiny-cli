import { Component, OnInit } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';
import { PurSettingsI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-purchase-settings',
  templateUrl: './purchase-settings.component.html',
  styleUrls: ['./purchase-settings.component.scss'],
})
export class PurchaseSettingsComponent implements OnInit {
  public timesOptions: Array<TiButtonItem> = [];
  public selectedTimes: TiButtonItem = {};
  public autoreneualfeeLabel: string = `${PurSettingsI18nPrefix}autoreneualfee`;
  public lightVmCountModel = {
    value: 1,
    max: 100,
    min: 0,
    format: 'n0',
  };

  constructor() {}

  ngOnInit(): void {
    // 购买时长
    const scales: Array<string> = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      `${PurSettingsI18nPrefix}nineMonth`,
      `${PurSettingsI18nPrefix}oneYear`,
      `${PurSettingsI18nPrefix}twoYears`,
      `${PurSettingsI18nPrefix}threeYears`,
      `${PurSettingsI18nPrefix}fourYears`,
      `${PurSettingsI18nPrefix}fiveYears`,
    ];

    scales.forEach((item: string, index: number) => {
      const obj: any = {
        text: item,
      };

      // 年份右上角增加推荐图标
      if (index > 8) {
        obj.sup = {
          class: 'buttongroup-discount-icon',
          iconName: 'discount-sup',
        };
      }
      this.timesOptions.push(obj);
    });

    this.selectedTimes = this.timesOptions[0];
  }
}
