import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TiActionmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData, TiHalfmodalComponent, TiModalService } from '@opentiny/ng';
import { BucketDetailTableI18nPrefix, TProTranslatePipe, Bucket, ObsStorageClass } from '@shared/tiny-pro';
import { ObsService } from 'src/app/@core/services/obs.service';
import { LogicUtilService } from 'src/app/@core/services/util.service';

@Component({
  selector: 't-pro-obs-table',
  templateUrl: './obs-table.component.html',
  styleUrls: ['./obs-table.component.scss'],
})
export class ObsTableComponent implements OnInit {
  @ViewChild('modal', { static: true }) halfmodal!: TiHalfmodalComponent;
  public featureInfoList: Array<any> = [
    {
      extraClass: 'icon-monitor-active',
      iconName: 'desktop-outline',
      tip: `${BucketDetailTableI18nPrefix}monitor`,
    },
    {
      extraClass: '',
      iconName: 'settings-outline',
      tip: `${BucketDetailTableI18nPrefix}dataTip`,
    },
    {
      extraClass: '',
      iconName: 'document-text-outline',
      tip: `${BucketDetailTableI18nPrefix}imageProcessing`,
    },
  ];
  public none: string = '--';
  public currentPage: number = 1;
  public totalNumber: number = 0;
  public pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10,
  };
  public displayed: Array<TiTableRowData> = [];
  public srcData!: TiTableSrcData;
  public columns: Array<TiTableColumns> = [
    {
      title: `${BucketDetailTableI18nPrefix}bucketName`,
      sortKey: 'bucketName',
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}links`,
      width: '10%',
      show: true,
    },
    {
      title: `${BucketDetailTableI18nPrefix}storage`,
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}region`,
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}capaticity`,
      sortKey: 'capaticity',
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}objects`,
      sortKey: 'objects',
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}version`,
      sortKey: 'version',
      width: '10%',
    },
    {
      title: `${BucketDetailTableI18nPrefix}operation`,
      width: '10%',
    },
  ];
  public bucketInfoInput: Bucket = {
    bucketName: '',
  };

  public obsStorageClass: any = ObsStorageClass;

  constructor(private translate: TranslateService, private tProTrans: TProTranslatePipe, private obsService: ObsService, private tiModal: TiModalService) {}

  ngOnInit(): void {
    this.columns = this.tProTrans.transform(this.columns);
    this.srcData = {
      data: this.obsService.getObsTableData(),
      state: {
        searched: false,
        sorted: false,
        paginated: false,
      },
    };
    this.totalNumber = this.srcData.data.length;
  }

  refreshTable(): void {
    this.srcData.data = this.obsService.getObsTableData();
  }

  public dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    const items: Array<TiActionmenuItem> = [
      {
        label: this.translate.instant(`${BucketDetailTableI18nPrefix}createStorage`),
      },
      {
        label: this.translate.instant(`${BucketDetailTableI18nPrefix}delete`),
      },
    ];

    return items;
  };

  showDetail(curName: string, content: TemplateRef<any>): void {
    const bucketList = this.obsService.getObsTableData();
    const bucket = bucketList.find((item) => {
      return item.bucketName === curName;
    });

    if (bucket) {
      this.bucketInfoInput = bucket;
    }
    this.tiModal.open(content, {
      id: 'myModal',
    });
  }

  onBucketClicked(curName: string, halfmodal: TiHalfmodalComponent): void {
    const bucketList = this.obsService.getObsTableData();
    const bucket = bucketList.find((item) => {
      return item.bucketName === curName;
    });

    if (bucket) {
      this.bucketInfoInput = bucket;
    }

    halfmodal.show();
  }

  transformCapaticity(capaticity: string): string {
    if (!capaticity) {
      return '--';
    }

    return LogicUtilService.getFileSize(capaticity);
  }

  transformRegion(region: string): string {
    if (!region) {
      return '--';
    }

    return region;
  }

  transformStorage(storage: string): string {
    if (!storage) {
      return '--';
    }

    return storage;
  }

  transformObjects(objects: string): string {
    if (!objects) {
      return '--';
    }

    return objects;
  }

  transformVersion(version: string): string {
    if (!version) {
      return '--';
    }

    return version;
  }
}
