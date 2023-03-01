import { Component, Input } from '@angular/core';
import { Bucket, ObsStorageClass } from '@shared/tiny-pro';

@Component({
  selector: 't-pro-bucket-info',
  templateUrl: './bucket-info.component.html',
  styleUrls: ['./bucket-info.component.scss'],
})
export class BucketInfoComponent {
  @Input() bucketInfoInput: Bucket = {
    bucketName: '',
  };

  public obsStorageClass: any = ObsStorageClass;
  public none: string = '--'
}
