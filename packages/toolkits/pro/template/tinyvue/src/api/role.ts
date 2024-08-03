import axios from "axios";



export function getAllRole() {
  return axios.get('/api/role');
}

export function getAllRoleDetail() {
  return axios.get('/api/role/detail');
}

export function updateRole(data: any) {
  return axios.patch(`/api/role`, data);
}

export function deleteRole(id: number) {
  return axios.delete(`/api/role/${id}`);
}

export function createRole(data: any) {
  return axios.post(`/api/role`, data);
}
