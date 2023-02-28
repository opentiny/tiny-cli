import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
import { successResponseWrapper, requestParam } from './utils';

const taskList = Mock.mock({
  'list|60': [
    {
      'id': '@id',
      'name': 'xiaoming',
      'rank': '初级',
      'description': '一段描述文字',
      'createdTime': '@datetime',
      'status|1': ['0', '1', '2'],
      'owner': 'Tiny Design',
      'workbench': 'work',
      'role': '前端',
    },
  ],
});

let treeData = [];

export default [
  // list
  {
    url: '/api/list/tasks',
    method: 'post',
    response: (params: requestParam) => {
      const {
        pageIndex = 1,
        pageSize = 10,
        status,
        name,
        department,
        role,
        workname,
        enablement,
        type,
        study,
      } = JSON.parse(JSON.stringify(params.body));
      const index = pageIndex as number;
      const size = pageSize as number;
      const offset = (index - 1) * size;
      const count = index * size;

      if (status !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { status: string }) => item.status === status);
      } else if (name !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { name: string }) => item.name === name);
      } else if (department !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter(
            (item: { department: string }) => item.department === department
          );
      } else if (role !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { role: string }) => item.role === role);
      } else if (workname !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { workname: string }) => item.workname === workname);
      } else if (enablement !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter(
            (item: { enablement: string }) => item.enablement === enablement
          );
      } else if (type !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { type: string }) => item.type === type);
      } else if (study !== undefined) {
        treeData = taskList.list
          .slice(offset, count)
          .filter((item: { study: string }) => item.study === study);
      } else {
        treeData = taskList.list.slice(offset, count);
      }

      const data = Mock.mock({
        total: 60,
        list: treeData,
      });

      return successResponseWrapper(data);
    },
  },
] as MockMethod[];
