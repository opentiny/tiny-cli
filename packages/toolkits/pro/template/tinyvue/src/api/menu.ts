import axios from "axios";



export function getAllMenu() {
  return axios.get('/api/menu');
}

export function getRoleMenu(email: string) {
  return axios.get(`/api/menu/role/${email}`);
}

export function updateMenu(data: any) {
  return axios.patch(`/api/menu`, data);
}

export function deleteMenu(data: any) {
  return axios.delete(`/api/menu`, data);
}

export function createMenu(data: any) {
  return axios.post(`/api/menu`, data);
}
