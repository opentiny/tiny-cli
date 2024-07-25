import axios from 'axios';
import { UserInfo } from '@/store/modules/user/types';

export interface LoginData {
  email: string;
  password: string;
}

export interface LogoutData {
  token: string | null;
}

export interface  RegisterData {
  username: string;
  email: string;
  password: string;
  roleIds: number[];
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
  filterStatus?: [];
  filterType?: [];
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}
export function loginMail(data: LoginDataMail) {
  return axios.post<LoginRes>('/api/mail/login', data);
}

export function logout(data: LogoutData) {
  return axios.post<LoginRes>('/api/auth/logout', data);
}

// 获取全部用户
export function getAllUser() {
  return axios.get<UserInfo>(`/api/user`);
}

// 获取单个用户
export function getUserInfo(email: string) {
  return axios.get<UserInfo>(`/api/user/info/${email}`);
}

export function delUser(email: string) {
  return axios.delete<UserInfo>(`/api/user/${email}`);
}

export function updateUserInfo(data: UserInfo) {
  return axios.put<UserInfo>(`/api/user/userInfo`, data);
}

export function getUserData(data?: UserData) {
  return axios.post<UserRes>('/api/user/data', data);
}

export function registerUser(data: LoginData) {
  return axios.post<UserInfo>('/api/user/register', data);
}
