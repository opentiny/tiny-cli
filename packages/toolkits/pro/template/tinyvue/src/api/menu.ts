import axios from "axios";



export function getAllMenu() {
  return axios.get('/api/menu');
}

export function updateMenu(data: any) {
  return axios.patch(`/api/menu`, data);
}

export function deleteMenu(id: number) {
  return axios.delete(`/api/menu/${id}`);
}

export function createMenu(data: any) {
  return axios.post(`/api/menu`, data);
}
