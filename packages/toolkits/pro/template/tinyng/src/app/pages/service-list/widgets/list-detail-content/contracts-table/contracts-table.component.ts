import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiActionmenuItem, TiTableColumns, TiTableComponent, TiTableDataState, TiTableRowData, TiTableSrcData, TiModalRef, TiModalService } from '@opentiny/ng';
import { ContractsDetailTableI18nPrefix, TProTranslatePipe } from '@shared/tiny-pro';
import { ContractsService } from 'src/app/@core/services/contracts.service';
import { TimeUtilService } from 'src/app/@core/services/util.service';
import { Filter } from '../../service-list-filter';

@Component({
  selector: 't-pro-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.scss'],
  styles: ['.modal-class { width:450px !important; }'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractsTableComponent implements OnInit {
  @Input() isRefreshTable: Boolean = false;
  @Input() loading: Boolean = true;
  @Input() textInput: string = '';
  @Output() openModal = new EventEmitter();
  @Output() currentName: string = '';
  @Output() open: boolean = false;
  @ViewChild('myModal')
  modal!: TemplateRef<any>;

  public time: number = 1000;
  public displayed: Array<TiTableRowData> = [];
  public srcData!: TiTableSrcData;
  public columns: Array<TiTableColumns> = [
    {
      title: `${ContractsDetailTableI18nPrefix}name`,
      sortKey: 'name',
      width: '10%',
    },
    {
      title: `${ContractsDetailTableI18nPrefix}id`,
      width: '20%',
      show: true,
    },
    {
      title: `${ContractsDetailTableI18nPrefix}customerName`,
      width: '15%',
    },
    {
      title: `${ContractsDetailTableI18nPrefix}description`,
      width: '20%',
    },
    {
      title: `${ContractsDetailTableI18nPrefix}created`,
      sortKey: 'capaticity',
      width: '20%',
    },
    {
      title: `${ContractsDetailTableI18nPrefix}operation`,
      width: '15%',
    },
  ];
  currentPage: number = 1;
  totalNumber: number = 0;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50],
    size: 10,
  };

  constructor(
    private translate: TranslateService,
    private tProTrans: TProTranslatePipe,
    private contractsService: ContractsService,
    private tiModal: TiModalService,
    private filterserver: Filter
  ) {
    filterserver.FilterEventer.subscribe((filterInterface) => {
      this.columns = this.tProTrans.transform(this.columns);
      // query为查询的值，field为查询字段
      const params = {
        query: filterInterface.value || '',
        field: filterInterface.type || 'name',
      };
      this.onUpdateSrcDate(params);
      this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
    });
  }

  // 按时间正序
  sortTime(property: string | number | any) {
    return function (pre: { [x: string]: any }, next: { [x: string]: any }) {
      const valuePre = pre[property];
      const valueNext = next[property];
      return new Date(JSON.parse(JSON.stringify(valueNext))).getTime() - new Date(JSON.parse(JSON.stringify(valuePre))).getTime();
    };
  }

  async onStateUpdate(event: TiTableComponent): Promise<void> {
    this.loading = true;
    const pageInfo: TiTableDataState = event.getDataState();
    this.currentPage = pageInfo.pagination.currentPage;
    this.pageSize.size = pageInfo.pagination.itemsPerPage;
    const params = {
      query: '',
      field: 'name',
      pagesize: pageInfo.pagination.itemsPerPage,
      pagenum: pageInfo.pagination.currentPage,
    };
    const data = await this.contractsService.getContractsByPage(params);
    this.totalNumber = data?.count ?? 0;
    this.loading = false;
  }

  async onUpdateSrcDate(params: { query: string; field: string }) {
    let interfaceData = await this.contractsService.getContractsData(params);
    let sortData = interfaceData.sort(this.sortTime('updatedAt') as any);
    this.srcData = {
      data: sortData,
      state: {
        searched: false,
        sorted: false,
        paginated: false,
      },
    };
    this.loading = false;
    if (this.srcData.data) {
      this.srcData.data.map((item) => {
        item.createdAt = TimeUtilService.formatDate(new Date(item.createdAt)) + '\xa0GMT+0800';
        return item;
      });
    }
  }

  async ngOnInit(): Promise<void> {
    this.columns = this.tProTrans.transform(this.columns);
    // query为查询的值，field为查询字段
    const params = { query: '', field: 'name' };
    await this.onUpdateSrcDate(params);
    this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.srcData && changes['isRefreshTable']?.currentValue) {
      const params = { query: '', field: 'name' };
      this.onUpdateSrcDate(params);
      this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
    }
  }

  public dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    const items: Array<TiActionmenuItem> = [
      {
        label: this.translate.instant(`${ContractsDetailTableI18nPrefix}modify`),
      },
      {
        label: this.translate.instant(`${ContractsDetailTableI18nPrefix}delete`),
      },
    ];

    return items;
  };

  async onSelect(item: TiActionmenuItem, row: TiTableRowData): Promise<void> {
    if (item.label === this.translate.instant(`${ContractsDetailTableI18nPrefix}modify`)) {
      this.openModal.emit({ row });
    }

    if (item.label === this.translate.instant(`${ContractsDetailTableI18nPrefix}delete`)) {
      this.currentName = row.name;
      this.textInput = '';
      this.open = false;
      this.tiModal.open(this.modal, {
        id: 'myModal1',
        modalClass: 'delete-modal-class',
        context: {
          name: 'component',
          bodyText: 'component modal body',
        },
        beforeClose: async (modalRef: TiModalRef, reason: boolean): Promise<void> => {
          if (reason) {
            if (this.textInput === 'DELETE') {
              this.loading = true;
              const result = await this.contractsService.delContracts({
                id: row.id,
              });
              if (result.data === 'success') {
                const params = { query: '', field: 'name' };
                this.onUpdateSrcDate(params);
                this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
                this.loading = false;
                modalRef.destroy(reason);
              }
            } else {
              this.open = true;
            }
          } else {
            modalRef.destroy(reason);
          }
        },
        close: (modalRef: TiModalRef): void => {},

        dismiss: (modalRef: TiModalRef): void => {},
      });
    }
  }
}
