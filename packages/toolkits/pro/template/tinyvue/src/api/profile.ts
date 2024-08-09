import axios from 'axios';

// 获取detail表单的初始数据选项
export function getDetailData() {
  return axios.get(`${import.meta.env.VITE_MOCK_SERVER_HOST}/api/detail/getdata`);
}
