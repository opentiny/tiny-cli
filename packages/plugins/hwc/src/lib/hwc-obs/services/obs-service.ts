import { logs, cliConfig as tinyStageCliConfig } from '@opentiny/cli-devkit';
import { CONSTANTS, getTinyProConfigure } from '../../../core';
import { obsMsg } from '../../../assets/i18n';

const log = logs(
  `${tinyStageCliConfig.DEFAULT_BIN}-plugin-${CONSTANTS.TINY_PRO_DEFAULT_BIN}-obs`
);

export const isBucketExist = (obsClient: any, bucketName: string) => {
  return obsClient
    .headBucket({
      Bucket: bucketName,
    })
    .then((result: any) => {
      if (result.CommonMsg.Status === 404) {
        return false;
      }

      return true;
    })
    .catch((err: any) => {
      log.error(`${obsMsg.obsTermheadBucketErrMsg}： ${err}`);

      throw err;
    });
};

export const createBucket = (
  obsClient: any,
  region: string,
  bucketName: string
) => {
  return obsClient
    .createBucket({
      Bucket: bucketName,
      Location: region,
    })
    .then((result: any) => {
      if (result.CommonMsg.Status > 300) {
        log.error(`${obsMsg.obsTermCreateErrMsg}：${result.CommonMsg.Message}`);

        return false;
      }
      return true;
    })
    .catch((err: any) => {
      // 此处只记录Err，不抛出异常，以免外部重复打印错误
      log.error(`${obsMsg.obsTermCreateErrMsg}：${err}`);
    });
};

// 查询桶列表只返回对应region下的列表
export const getBucketsList = (obsClient: any) => {
  const {
    region: { id: regionId },
  } = getTinyProConfigure();

  return obsClient
    .listBuckets({
      QueryLocation: true,
    })
    .then((result: any) => {
      if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
        return result.InterfaceResult.Buckets.filter(
          (bucket) => bucket.Location === regionId
        ).map((bucket) => {
          return {
            bucketName: bucket.BucketName,
          };
        });
      }

      log.error(`${obsMsg.obsTermGetListErrMsg}： ${result.CommonMsg.Message}`);
      return [];
    })
    .catch((err: any) => {
      // 此处只记录Err，不抛出异常，以免外部重复打印错误
      log.error(`${obsMsg.obsTermGetListErrMsg}：${err}`);
    });
};

export const getBucketMetadata = (obsClient: any, bucketName: string) => {
  return obsClient
    .getBucketMetadata({
      Bucket: bucketName,
    })
    .then((result: any) => {
      if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
        return result.InterfaceResult;
      }

      log.error(`${obsMsg.obsTermGetListErrMsg}： ${result.CommonMsg.Message}`);
      return {};
    })
    .catch((err: any) => {
      // 此处只记录Err，不抛出异常，以免外部重复打印错误
      log.error(`${obsMsg.obsTermGetListErrMsg}：${err}`);
    });
};
