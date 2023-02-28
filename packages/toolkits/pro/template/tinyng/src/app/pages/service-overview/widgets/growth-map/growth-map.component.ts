import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportUrlPrefix, MapI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-growth-map',
  templateUrl: './growth-map.component.html',
  styleUrls: ['./growth-map.component.scss'],
})
export class GrowthMapComponent implements OnInit {
  public tabs: any[] = [
    {
      title: `${MapI18nPrefix}learn`,
      description: `${MapI18nPrefix}description`,
      children: [
        {
          label: `${MapI18nPrefix}step1Label`,
          childrenItem: [
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0002.html`,
              linkText: `${MapI18nPrefix}step1link1Text`,
            },
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0005.html`,
              linkText: `${MapI18nPrefix}step1link2Text`,
            },
            {
              link: `${SupportUrlPrefix}function-cbr/`,
              linkText: `${MapI18nPrefix}step1link3Text`,
            },
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0009.html`,
              linkText: `${MapI18nPrefix}step1link4Text`,
            },
          ],
        },
        {
          label: `${MapI18nPrefix}step2Label`,
          childrenItem: [
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0012.html#section0`,
              linkText: `${MapI18nPrefix}step2link1Text`,
            },
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0012.html#section2?`,
              linkText: `${MapI18nPrefix}step2link2Text`,
            },
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0012.html#section3`,
              linkText: `${MapI18nPrefix}step2link3Text`,
            },
            {
              link: `${SupportUrlPrefix}productdesc-cbr/cbr_01_0012.html#section4`,
              linkText: `${MapI18nPrefix}step2link4Text`,
            },
          ],
        },
      ],
      active: true,
    },
    {
      title: `${MapI18nPrefix}buy`,
      description: '',
      children: [],
      active: false,
    },
    {
      title: `${MapI18nPrefix}tabBackup`,
      description: '',
      children: [],
      active: false,
    },
    {
      title: 'serviceOverview.creation.vmware',
      description: '',
      children: [],
      active: false,
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.tabs.forEach((tab) => {
      tab.title = this.translate.instant(tab.title);

      if (tab.description) {
        tab.description = this.translate.instant(tab.description);
      }

      if (tab.children.length !== 0) {
        tab.children.forEach((item: any) => {
          item.label = this.translate.instant(item.label);

          item.childrenItem.forEach((child: any) => {
            child.link = this.translate.instant(child.link);
            child.linkText = this.translate.instant(child.linkText);
          });
        });
      }
    });
  }
}
