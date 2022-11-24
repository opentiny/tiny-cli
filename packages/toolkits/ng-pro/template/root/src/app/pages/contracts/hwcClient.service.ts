import { HwcClient } from '@opentiny/hwc-client';

export class HwcClientService {
  public static async apiRequest(fnName: string, params: any, api: string = 'apig_contract', apigroup: string = 'DEFAULT') {
    const response = await HwcClient.apigClient.exec(apigroup, api, {
      query: { fn_name: fnName },
      body: JSON.stringify(params)
    });
    const result = await response?.json();

    return result?.data;
  }
}
