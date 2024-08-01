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
export function getAllUser(page?: number, limit?: number) {
  return axios.get<UserInfo>(`/api/user?page=${page}&limit=${limit}`);
}

// 获取单个用户
export function getUserInfo(email: string) {
  return axios.get<UserInfo>(`/api/user/info/${email}`);
}

export function deleteUser(email: string) {
  return axios.delete<UserInfo>(`/api/user/${email}`);
}

export function updateUserInfo(data: any) {
  return axios.patch('/api/user/update', data);
}

export function getUserData(data?: UserData) {
  return axios.post<UserRes>('/api/user/data', data);
}

export function registerUser(data: any) {
  return axios.post<UserInfo>('/api/user/reg', data);
}

export function updatePwdAdmin(data: any) {
  return axios.patch('/api/user/admin/updatePwd', data);
}

export function updatePwdUser(data: any) {
  return axios.patch('/api/user/updatePwd', data);
}

