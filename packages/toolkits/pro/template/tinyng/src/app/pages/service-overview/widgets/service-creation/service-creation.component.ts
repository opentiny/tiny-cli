import { Component, OnInit } from '@angular/core';
import { CreationI18nPrefix } from '@shared/tiny-pro';

interface guideItem {
  icon: string;
  label: string;
  description: string;
}

@Component({
  selector: 't-pro-service-creation',
  templateUrl: './service-creation.component.html',
  styleUrls: ['./service-creation.component.scss'],
})
export class ServiceCreationComponent {
  public createGuides: Array<guideItem> = [
    {
      icon: 'create-csbs-icon',
      label: `${CreationI18nPrefix}csbs`,
      description: `${CreationI18nPrefix}csbsContent`,
    },
    {
      icon: 'create-vbs-icon',
      label: `${CreationI18nPrefix}cdb`,
      description: `${CreationI18nPrefix}cdbContent`,
    },
    {
      icon: 'create-sfs-icon',
      label: `${CreationI18nPrefix}sfs`,
      description: `${CreationI18nPrefix}sfsContent`,
    },
    {
      icon: 'create-vmware-icon',
      label: `${CreationI18nPrefix}vmware`,
      description: `${CreationI18nPrefix}vmwareContent`,
    },
  ];
}
