import axios from 'axios';

export function getAllPermission() {
  return axios.get(`/api/permission`);
}

export function updatePermission(data: any) {
  return axios.patch(`/api/permission`, data);
}

export function deletePermission(id: number) {
  return axios.delete(`/api/permission/${id}`);
}

export function createPermission(data: any) {
  return axios.post(`/api/permission`, data);
}
