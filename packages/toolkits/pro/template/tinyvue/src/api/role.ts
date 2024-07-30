import axios from "axios";



export function getRoles() {
  return axios.get('/api/role');
}
