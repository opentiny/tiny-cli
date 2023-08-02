import { HwcClient } from '@opentiny/hwc-client';
import { ApigInfo, BaseUtils } from '@shared/tiny-pro';

export class HwcClientService {
  public static async apiRequest(fnName: string, params: any, apigInfo: ApigInfo) {
    try {
      const response = await HwcClient.apigClient.exec(apigInfo.apigGroupName, apigInfo.apigName, {
        query: { fn_name: fnName },
        body: JSON.stringify(params),
      });

      return response?.json();
    } catch (error) {
      return BaseUtils.getErrorMessage(error);
    }
  }
}
