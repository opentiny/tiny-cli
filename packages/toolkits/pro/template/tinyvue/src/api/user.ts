import axios from 'axios';
import { UserInfo } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginDataMail {
  mailname: string;
  mailpassword: string;
}

export interface LoginRes {
  token: string;
  userInfo: UserInfo;
}
export interface UserRes {
  chartData: [];
  tableData: [];
}
export interface UserData {
  sort?: number | undefined;
  startTime?: string;
  endTime?: string;
  filterStatue?: [];
  filterType?: [];
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
export function loginMail(data: LoginDataMail) {
  return axios.post<LoginRes>('/api/mail/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo(id: string) {
  return axios.get<UserInfo>(`/api/user/userInfo/${id}`);
}

export function getUserData(data?: UserData) {
  return axios.post<UserRes>('/api/user/data', data);
}

export function registerUser(data: LoginData) {
  return axios.post<UserInfo>('/api/user/register', data);
}
