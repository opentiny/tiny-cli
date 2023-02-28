import axios from 'axios';

export interface QueryTaskParmas {
  pageIndex: number;
  pageSize: number;
  [key: string]: any;
}

export function queryTaskList(params: QueryTaskParmas) {
  return axios.post('/api/list/tasks', params);
}
