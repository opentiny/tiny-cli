import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
} from '@angular/core';
import {
  ContractsDetailTableI18nPrefix,
  TProTranslatePipe,
} from '@shared/tiny-pro';
import { TiPositionType } from '@opentiny/ng';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../service-list-filter';

export interface GuideheadConfig {
  helptip: {
    label?: string;
    iconTip?: string | TemplateRef<any> | any;
    iconTipPosition?: TiPositionType;
    iconTipMaxWidth?: string;
  };
  buttons: Array<any>;
}

@Component({
  selector: 't-pro-list-guide-head',
  templateUrl: './list-guide-head.component.html',
  styleUrls: ['./list-guide-head.component.scss'],
})
export class ListGuideHeadComponent implements OnInit {
  @ViewChild('bucketTip', { static: true })
  bucketTip!: TemplateRef<any>;
  @ViewChild('contractsTip', { static: true })
  contractsTip!: TemplateRef<any>;
  @Input() label: string = '';
  @Input()
  config!: GuideheadConfig;
  @Input() public feedbackList: Array<any> = [];
  @Input() flag: string = '';
  @Input() tableSelect: any = [
    {
      label: '',
      value: '',
    },
  ];
  @Output() tableOptions: Array<any> = [
    {
      label: `${ContractsDetailTableI18nPrefix}name`,
      value: 'name',
    },
    {
      label: `${ContractsDetailTableI18nPrefix}customerName`,
      value: 'customer',
    },
  ];

  public placeholder: string = this.translate.instant(
    'serviceList.contracts.modal.namePlaceholder'
  );

  constructor(
    private filter: Filter,
    private tProTrans: TProTranslatePipe,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.tableOptions = this.tProTrans.transform(this.tableOptions);
    if (this.flag === 'buckets') {
      this.config.helptip.iconTip = this.bucketTip;
    }

    if (this.flag === 'contracts') {
      this.config.helptip.iconTip = this.contractsTip;
    }
    this.tableSelect = this.tableOptions[0];
    this.config.helptip.label = this.label;
  }

  public onNgModelChange(event: any): void {
    let item: string = '';
    if (this.tableSelect.value === 'name') {
      item = 'serviceList.contracts.modal.namePlaceholder';
    } else if (this.tableSelect.value === 'customer') {
      item = 'serviceList.contracts.modal.customerPlaceholder';
    }
    this.placeholder = this.translate.instant(item);
  }

  // 搜索请求数据
  public onSearch(event: any): void {
    let param = { type: this.tableSelect.value, value: event };
    this.filter.FilterEventer.emit(param);
  }

  public onButtonClick(button: any): void {
    if (typeof button.click === 'function') {
      button.click();
    }
  }
}
