import { Component } from '@angular/core';
import { SupportUrlPrefix, TurorialI18nPrefix } from '@shared/tiny-pro';
interface BeginnerItem {
  href: string;
  text: string;
}

@Component({
  selector: 't-pro-beginner-guide',
  templateUrl: './beginner-guide.component.html',
  styleUrls: ['./beginner-guide.component.scss'],
})
export class BeginnerGuideComponent {
  public moreLink: string = `${SupportUrlPrefix}help-novice.html`;

  public guideList: Array<BeginnerItem> = [
    {
      href: `${SupportUrlPrefix}qs-ecs/zh-cn_topic_0163540195.html`,
      text: `${TurorialI18nPrefix}purchaseTutorial`,
    },
    {
      href: `${SupportUrlPrefix}qs-evs/evs_qs_0001.html`,
      text: `${TurorialI18nPrefix}diskTutorial`,
    },
    {
      href: `${SupportUrlPrefix}qs-vpc/zh-cn_topic_0017816228.html`,
      text: `${TurorialI18nPrefix}internetTutorial`,
    },
  ];
}
