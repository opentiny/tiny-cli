import { Component, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiHalfmodalComponent, TiModalService } from '@opentiny/ng';
import { ContractsListHeadI18nPrefix } from '@shared/tiny-pro';
import { GuideheadConfig } from '../service-list.module';

@Component({
  selector: 't-pro-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
  @ViewChild('modal', { static: true }) halfmodal!: TiHalfmodalComponent;
  @ViewChild('modal') modal!: TemplateRef<any>;
  alertOpen: boolean = false;
  alertMessage: string = '';
  isRefreshTable: boolean = false;

  public contractsConfig: GuideheadConfig = {
    helptip: {
      label: '',
      iconTip: '',
    },
    buttons: [
      {
        id: '1',
        label: this.translate.instant(`${ContractsListHeadI18nPrefix}createContract`),
        color: 'danger',
        click: (): void => {
          this.showModal(this.modal)
          this.operation = 'create';
          this.isRefreshTable = false;
        },
      },
    ],
  };

  public feedbackList: Array<any> = [
    {
      icon: 'book-outline',
      label: `${ContractsListHeadI18nPrefix}help`,
    },
  ];

  public flag: string = 'contracts';
  public operation: string = 'create'; // 默认为创建合同
  public rowData: any;
  public showModal(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      id: 'modal',
      // modalClass接口：接收弹窗的自定义样式
      modalClass: 'modal-class-create'
    });
  }
  
  constructor(
    private translate: TranslateService, 
    private tiModal: TiModalService
  ) {}

  public openHalfModal($event: any): void {
    this.rowData = $event;
    this.operation = 'edit';
    this.isRefreshTable = false;
    this.showModal(this.modal)
  }

  public openAlert(): void {
    this.alertOpen = true;

    this.alertMessage = this.translate.instant(`serviceList.contracts.modal.${this.operation}Success`);
  }

  public refreshTable(): void {
    this.isRefreshTable = true;
  }
}
