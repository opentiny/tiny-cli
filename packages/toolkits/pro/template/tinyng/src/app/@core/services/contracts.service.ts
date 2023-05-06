import { HwcClientService } from './hwcClient.service';
import { ApigInfo } from '@shared/tiny-pro';

const contractApigInfo: ApigInfo = {
  apigName: 'apig_contract',
  apigGroupName: 'group_contract',
};

export class ContractsService {
  async getContractsData(params: { query: string; field: string }) {
    const result = await HwcClientService.apiRequest('getContracts', params, contractApigInfo);

    return result?.data;
  }

  async getContractsByPage(params: { query: string; field: string; pagesize: number; pagenum: number }) {
    const result = await HwcClientService.apiRequest('getContractsByPage', params, contractApigInfo);

    return result?.data;
  }

  createContracts(params: { name: string; customer: string; description: string }) {
    return HwcClientService.apiRequest('addContract', params, contractApigInfo);
  }

  editContracts(params: { id: string; name: string; customer: string; description: string }) {
    return HwcClientService.apiRequest('editContract', params, contractApigInfo);
  }

  delContracts(params: { id: string }) {
    return HwcClientService.apiRequest('delContract', params, contractApigInfo);
  }
}
