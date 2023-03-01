import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TiFilter, TiFileItem } from '@opentiny/ng';
import { ObsService } from 'src/app/@core/services/obs.service';
import { Bucket, BucketUpload, CancelFileItems } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-obs-file-drop',
  templateUrl: './obs-file-drop.component.html',
  styleUrls: ['./obs-file-drop.component.scss'],
})
export class ObsFileDropComponent implements OnInit {
  @Input() bucketInfoInput: Bucket = {
    bucketName: '',
  };
  @ViewChild('upload') upload: any;
  @Output() refreshTable = new EventEmitter();

  filters: Array<TiFilter> = [
    {
      // 限制上传的文件格式为png和jpg
      name: 'type',
      params: ['.png,.jpg'],
    },
    {
      // 限制文件最大不能超过100KB
      name: 'maxSize',
      params: [100000],
    },
  ];

  url: string = '/upload';
  maxCount: number = 1;
  isError: boolean = false;
  errorType: boolean = false;
  errorSize: boolean = false;
  errorObs: boolean = false;
  obsErrorTip: string = '';
  isShowUploadSuccess: boolean = false;

  constructor(private obsService: ObsService) {}

  ngOnInit(): void {}

  addItemFailed(event: any): void {
    if (event.validResults.includes('type')) {
      this.errorType = true;
      this.isError = true;
    }
    if (event.validResults.includes('maxSize')) {
      this.errorSize = true;
      this.isError = true;
    }
  }

  public async beforeSendItems(fileItem: Array<TiFileItem>): Promise<void> {
    const bucketUpload: BucketUpload = {
      bucketName: this.bucketInfoInput.bucketName,
      objectName: fileItem[0].file.name,
      sourceFile: fileItem[0].file._file,
    };

    try {
      const result = await this.obsService.uploadUsingFile(bucketUpload);

      if (result?.CommonMsg?.Status === 200) {
        // 执行cancel方法不发送url请求
        fileItem[0].cancel();

        // 获取图片地址显示
        const url: string = window.URL.createObjectURL(fileItem[0].file._file);
        const length = this.upload.fileList.length;
        this.upload.fileList[length - 1].previewUrl = url;
        this.upload.fileList[length - 1].isImage = true;

        this.isShowUploadSuccess = true;
      } else {
        this.errorObs = true;
        this.isError = true;
        this.obsErrorTip = result.CommonMsg.Message;
      }
    } catch (error) {
      console.error('error', error);
    }
  }

  onCancelItems(fileItem: CancelFileItems): void {
    fileItem.fileItems[0].isSuccess = true;
    fileItem.fileItems[0].isError = false;

    // 上传对象成功后刷新表格对象数量的值
    this.refreshTable.emit();
  }
}
