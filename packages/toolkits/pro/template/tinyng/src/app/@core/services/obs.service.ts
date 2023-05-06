import { HwcClient } from '@opentiny/hwc-client';
import { Bucket, BucketUpload } from '@shared/tiny-pro';
import hwcConfig from '../../../../hwc-exports.json';

// obs接口文档:https://support.huaweicloud.com/api-obs_browserjs_sdk_api_zh/obs_34_0301.html
// 配置桶跨域：https://support.huaweicloud.com/sdk-browserjs-devg-obs/obs_24_0201.html
export class ObsService {
  private getBucketMetadata(bucket: Bucket) {
    HwcClient.obsClient.getBucketMetadata(
      {
        Bucket: bucket.bucketName,
      },
      (err: any, result: any) => {
        if (err) {
          console.error('Error-->' + err);
        } else {
          if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
            bucket.storage = result.InterfaceResult.StorageClass;
            bucket.region = result.InterfaceResult.Location;
            bucket.version = result.InterfaceResult.ObsVersion;
          }
        }
      }
    );
  }

  private getBucketStorageInfo(bucket: Bucket) {
    HwcClient.obsClient.getBucketStorageInfo(
      {
        Bucket: bucket.bucketName,
      },
      (err: any, result: any) => {
        if (err) {
          console.error('Error-->' + err);
        } else {
          if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
            bucket.objects = result.InterfaceResult.ObjectNumber;
            bucket.capaticity = result.InterfaceResult.Size;
          }
        }
      }
    );
  }

  public async uploadUsingFile(bucketUpload: BucketUpload): Promise<any> {
    return HwcClient.obsClient
      .putObject({
        Bucket: bucketUpload.bucketName,
        Key: bucketUpload.objectName,
        SourceFile: bucketUpload.sourceFile,
      })
      .then((result: any) => {
        if (result.CommonMsg.Status < 300) {
          console.info('ObsService Upload File Succeed');
        } else {
          console.info('ObsService Upload File Message:' + result.CommonMsg.Message);
        }

        return result;
      })
      .catch((err: any) => {
        console.error('ObsService Upload File Error:' + err);

        return err;
      });
  }

  getObsTableData() {
    let data: Array<Bucket> = [];

    const {
      hwcConfig: {
        obs: { bucketsList },
      },
    } = JSON.parse(JSON.stringify(hwcConfig));

    if (bucketsList.length) {
      data = bucketsList.map((item: Bucket) => {
        this.getBucketMetadata(item);
        this.getBucketStorageInfo(item);

        return item;
      });
    }

    return data;
  }
}
