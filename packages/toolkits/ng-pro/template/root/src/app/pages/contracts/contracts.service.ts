import { Injectable } from '@angular/core';
import { HwcClientService } from './hwcClient.service';

@Injectable()
export class ContractsService {
  getContractsData(params: { query: string; field: string }) {
    return HwcClientService.apiRequest('getContracts', params);
  }

  getContractsByPage(params: { query: string; field: string; pagesize: number; pagenum: number }) {
    return HwcClientService.apiRequest('getContractsByPage', params);
  }

  createContracts(params: { name: string; customer: string; description: string }) {
    return HwcClientService.apiRequest('addContract', params);
  }

  editContracts(params: { id: string; name: string; customer: string; description: string }) {
    return HwcClientService.apiRequest('editContract', params);
  }

  delContracts(params: { id: string }) {
    return HwcClientService.apiRequest('delContract', params);
  }
}

export class TimeUtilService {
  // 转化中国标准时间
  public static formatDate(d: Date) {
    let date = new Date(d);
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
  }
}
