import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  TiActionmenuItem,
  TiTableColumns,
  TiTableComponent,
  TiTableDataState,
  TiTableRowData,
  TiTableSrcData,
  TiModalRef,
  TiModalService,
  TiValidators
} from '@opentiny/ng';
import { TProTranslatePipe } from '@shared/tiny-pro';
import { ContractsService, TimeUtilService } from './contracts.service';

const ContractsDetailTableI18nPrefix = 'contracts.detailTable.';

@Component({
  selector: 't-pro-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  @ViewChild('modifyModal') modifyModal!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  loading: Boolean = true;
  textInput: string = '';
  currentName: string = '';
  flag: string = 'create';
  alertOpen: boolean = false;
  deleteOpen: boolean = false;
  serviceForm: FormGroup;

  public displayed: Array<TiTableRowData> = [];
  public srcData!: TiTableSrcData;
  public columns: Array<TiTableColumns> = [
    {
      title: `${ContractsDetailTableI18nPrefix}name`,
      sortKey: 'name',
      width: '10%'
    },
    {
      title: `${ContractsDetailTableI18nPrefix}id`,
      width: '20%',
      show: true
    },
    {
      title: `${ContractsDetailTableI18nPrefix}customerName`,
      width: '15%'
    },
    {
      title: `${ContractsDetailTableI18nPrefix}description`,
      width: '15%'
    },
    {
      title: `${ContractsDetailTableI18nPrefix}created`,
      sortKey: 'capaticity',
      width: '20%'
    },
    {
      title: `${ContractsDetailTableI18nPrefix}operation`,
      width: '20%'
    }
  ];
  currentPage: number = 1;
  totalNumber: number = 0;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50],
    size: 10
  };

  constructor(
    private translate: TranslateService,
    private tProTrans: TProTranslatePipe,
    private contractsService: ContractsService,
    private tiModal: TiModalService,
    private fb: FormBuilder
  ) {
    this.serviceForm = fb.group({
      nameInput: new FormControl('', [TiValidators.required, this.nameValidation()]),
      customerInput: new FormControl(''),
      descInput: new FormControl('')
    });
  }

  nameValidation = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value ? control.value.trim() : control.value;
      let tiErrorMessage = '';
      const nameRe = /^([a-zA-Z0-9]|[\u4e00-\u9fa5])([a-zA-Z0-9._:()（）、：\/-]|[\u4e00-\u9fa5]){2,254}$/;
      if (!nameRe.test(value)) {
        tiErrorMessage = this.translate.instant('contracts.modal.nameFormat');
      } else {
        return null;
      }

      return {
        nameValidation: {
          actualValue: control.value,
          tiErrorMessage: tiErrorMessage
        }
      };
    };
  };

  async onStateUpdate(event: TiTableComponent): Promise<void> {
    this.loading = true;
    const pageInfo: TiTableDataState = event.getDataState();
    this.currentPage = pageInfo.pagination.currentPage;
    this.pageSize.size = pageInfo.pagination.itemsPerPage;
    const params = {
      query: '',
      field: 'name',
      pagesize: pageInfo.pagination.itemsPerPage,
      pagenum: pageInfo.pagination.currentPage
    };
    const data = await this.contractsService.getContractsByPage(params);
    this.totalNumber = data?.count ?? 0;
    this.loading = false;
  }

  async onUpdateSrcDate(params: { query: string; field: string }) {
    this.srcData = {
      data: await this.contractsService.getContractsData(params),
      state: {
        searched: false,
        sorted: false,
        paginated: false
      }
    };

    this.loading = false;
    if (this.srcData.data) {
      this.srcData.data.map(item => {
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

  public dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    const items: Array<TiActionmenuItem> = [
      {
        label: this.translate.instant(`${ContractsDetailTableI18nPrefix}modify`)
      },
      {
        label: this.translate.instant(`${ContractsDetailTableI18nPrefix}delete`)
      }
    ];

    return items;
  };

  createContract() {
    this.serviceForm.controls.nameInput.setValue('');
    this.serviceForm.controls.customerInput.setValue('');
    this.serviceForm.controls.descInput.setValue('');

    this.tiModal.open(this.modifyModal, {
      id: 'modifyModal',
      context: {
        name: 'create'
      },
      close: async (modalRef: TiModalRef): Promise<void> => {
        this.loading = true;
        const serviceParam = {
          name: this.serviceForm.controls.nameInput.value,
          customer: this.serviceForm.controls.customerInput.value,
          description: this.serviceForm.controls.descInput.value
        };

        const result = await this.contractsService.createContracts(serviceParam);
        if (result) {
          const params = { query: '', field: 'name' };
          this.onUpdateSrcDate(params);
          this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
          this.loading = false;
          this.flag = 'create';
          this.alertOpen = true;
        }
      },
      dismiss: (modalRef: TiModalRef): void => {}
    });
  }

  editContract(rowData: TiTableRowData) {
    this.serviceForm.controls.nameInput.setValue(rowData ? rowData.name : '');
    this.serviceForm.controls.customerInput.setValue(rowData ? rowData.customer : '');
    this.serviceForm.controls.descInput.setValue(rowData ? rowData.description : '');

    this.tiModal.open(this.modifyModal, {
      id: 'modifyModal',
      context: {
        name: 'edit'
      },
      close: async (modalRef: TiModalRef): Promise<void> => {
        this.loading = true;
        const serviceParam = {
          id: rowData.id,
          name: this.serviceForm.controls.nameInput.value,
          customer: this.serviceForm.controls.customerInput.value,
          description: this.serviceForm.controls.descInput.value
        };

        const result = await this.contractsService.editContracts(serviceParam);

        if (result) {
          const params = { query: '', field: 'name' };
          this.onUpdateSrcDate(params);
          this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
          this.loading = false;
          this.flag = 'edit';
          this.alertOpen = true;
        }
      },
      dismiss: (modalRef: TiModalRef): void => {}
    });
  }

  deleteContract(rowData: TiTableRowData) {
    this.tiModal.open(this.deleteModal, {
      id: 'deleteModal',
      close: async (modalRef: TiModalRef): Promise<void> => {
        if (this.textInput === 'DELETE') {
          this.loading = true;
          const result = await this.contractsService.delContracts({
            id: rowData.id
          });
          if (result === 'success') {
            const params = { query: '', field: 'name' };
            this.onUpdateSrcDate(params);
            this.totalNumber = this.srcData.data ? this.srcData.data.length : 0;
            this.loading = false;
          }
        } else {
          this.deleteOpen = true;
        }
      },
      dismiss: (modalRef: TiModalRef): void => {}
    });
  }

  async onSelect(item: TiActionmenuItem, row: TiTableRowData): Promise<void> {
    if (item.label === this.translate.instant(`${ContractsDetailTableI18nPrefix}modify`)) {
      this.editContract(row);
    }

    if (item.label === this.translate.instant(`${ContractsDetailTableI18nPrefix}delete`)) {
      this.currentName = row.name;
      this.deleteContract(row);
    }
  }
}
