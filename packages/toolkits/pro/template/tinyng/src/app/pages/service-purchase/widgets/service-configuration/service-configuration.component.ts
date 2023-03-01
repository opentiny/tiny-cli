import { Component } from '@angular/core';
import { ConfigurationI18nPrefix } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-service-configuration',
  templateUrl: './service-configuration.component.html',
  styleUrls: ['./service-configuration.component.scss'],
})
export class ServiceConfigurationComponent {
  public specModel: any = [
    {
      price: '65.98',
      label: `${ConfigurationI18nPrefix}label1vCPUs`,
      diskSize: '40',
      bandWidth: '1',
      storageSize: '500',
      descriptionTitle: `${ConfigurationI18nPrefix}entry`,
      description: `${ConfigurationI18nPrefix}entryDesc`,
      checked: true,
    },
    {
      price: '101.98',
      label: `${ConfigurationI18nPrefix}label2vCPUs`,
      diskSize: '40',
      bandWidth: '1',
      storageSize: '1500',
      descriptionTitle: `${ConfigurationI18nPrefix}basic`,
      description: `${ConfigurationI18nPrefix}basicDesc`,
      checked: false,
    },
    {
      price: '196.98',
      label: `${ConfigurationI18nPrefix}label4vCPUs`,
      diskSize: '40',
      bandWidth: '2',
      storageSize: '1000',
      descriptionTitle: `${ConfigurationI18nPrefix}advanced`,
      description: `${ConfigurationI18nPrefix}advancedDesc`,
      checked: false,
    },
  ];

  public selectSpec(item: any): void {
    // 镜像卡片只支持单选
    for (let i = 0; i < this.specModel.length; i++) {
      if (this.specModel[i].label !== item.label) {
        this.specModel[i].checked = false;
      }
    }
    item.checked = !item.checked;
  }
}
