import { TiFileItem } from '@opentiny/ng';

enum StorageClass {
  STANDARD = 'STANDARD',
  WARM = 'WARM',
  COLD = 'COLD',
}

export enum ObsStorageClass {
  STANDARD = 'serviceList.buckets.detailTable.standard',
  WARM = 'serviceList.buckets.detailTable.infrequentAccess',
  COLD = 'serviceList.buckets.detailTable.archive',
}

export interface Bucket {
  bucketName: string; // 桶名
  storage?: StorageClass; // 桶存储类型
  region?: string; // 桶区域位置
  capaticity?: string; // 桶的空间大小
  objects?: number; // 桶内对象个数
  version?: string; // OBS服务端版本
}

export interface BucketUpload {
  bucketName: string; // 桶名
  objectName: string; // 对象名
  sourceFile: Blob | File; // 待上传的文件
}

export interface CancelFileItems {
  fileItems: TiFileItem[];
  response: string;
  status: number;
}
