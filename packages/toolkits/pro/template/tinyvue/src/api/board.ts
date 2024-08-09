import axios from 'axios';

axios.defaults.timeout = 5000;
// 获取select的option
export function getUserData() {
  return axios.get(`${import.meta.env.VITE_MOCK_SERVER_HOST}/api/user/getdata`);
}

export function getUserPractic() {
  return axios.get(`${import.meta.env.VITE_MOCK_SERVER_HOST}/api/user/getrpractic`);
}

export function getUserTrain() {
  return axios.get(`${import.meta.env.VITE_MOCK_SERVER_HOST}/api/user/getrtrain`);
}

// 切换数据源
export function getUserChange(data: string) {
  return axios.post(`${import.meta.env.VITE_MOCK_SERVER_HOST}/api/user/getselect`, data as any);
}
