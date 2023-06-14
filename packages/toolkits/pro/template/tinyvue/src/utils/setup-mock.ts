import Mock from 'mockjs';
import debug from './env';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    errMsg: '',
    code: '0',
  };
};

export const failResponseWrap = (
  data: unknown,
  errMsg: string,
  code = 50000
) => {
  return {
    data,
    errMsg,
    code,
  };
};

export const initData = Mock.mock({
  chartData: [
    {
      title: 'userInfo.week.1',
      value: 1,
      list: [
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionA',
          len: 1,
          bid: 'A',
          pid: 'A',
        },
        {
          type: 'userInfo.type.optionC',
          status: 'userInfo.statue.optionB',
          len: 5,
          bid: 'c',
          pid: 'B',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionC',
          len: 3,
          bid: 'A',
          pid: 'C',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionA',
          len: 1,
          bid: 'A',
          pid: 'A',
        },
        {
          type: 'userInfo.type.optionB',
          status: 'userInfo.statue.optionA',
          len: 6,
          bid: 'B',
          pid: 'A',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionC',
          len: 1,
          bid: 'A',
          pid: 'C',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionA',
          len: 1,
          bid: 'A',
          pid: 'A',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionB',
          len: 1,
          bid: 'A',
          pid: 'B',
        },
        {
          type: 'userInfo.type.optionB',
          status: 'userInfo.statue.optionA',
          len: 1,
          bid: 'B',
          pid: 'A',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionC',
          len: 1,
          bid: 'A',
          pid: 'C',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionD',
          len: 1,
          bid: 'A',
          pid: 'D',
        },
        {
          type: 'userInfo.type.optionC',
          status: 'userInfo.statue.optionD',
          len: 1,
          bid: 'C',
          pid: 'D',
        },
        {
          type: 'userInfo.type.optionA',
          status: 'userInfo.statue.optionD',
          len: 1,
          bid: 'A',
          pid: 'D',
        },
      ],
    },
    { title: 'userInfo.month.1', value: 0 },
    { title: 'userInfo.month.2', value: 0 },
    { title: 'userInfo.month.3', value: 0 },
    { title: 'userInfo.month.4', value: 0 },
    { title: 'userInfo.month.5', value: 0 },
    { title: 'userInfo.month.6', value: 0 },
    { title: 'userInfo.month.7', value: 0 },
    { title: 'userInfo.month.8', value: 0 },
    { title: 'userInfo.month.9', value: 0 },
    { title: 'userInfo.month.10', value: 0 },
    { title: 'userInfo.month.11', value: 0 },
    { title: 'userInfo.month.12', value: 0 },
    { title: 'userInfo.month.13', value: 0 },
    { title: 'userInfo.month.14', value: 0 },
    { title: 'userInfo.month.15', value: 0 },
    { title: 'userInfo.month.16', value: 0 },
    { title: 'userInfo.month.17', value: 0 },
  ],
  tableData: [
    {
      id: '1',
      bid: 'A',
      pid: 'D',
      name: 'GFD Company',
      time: '2021-12-18',
      type: 'userInfo.type.optionA',
      statue: 'userInfo.statue.optionD',
    },
    {
      id: '2',
      bid: 'B',
      pid: 'A',
      name: 'WWWW Company',
      time: '2021-11-18',
      type: 'userInfo.type.optionB',
      statue: 'userInfo.statue.optionA',
    },
    {
      id: '3',
      bid: 'C',
      pid: 'B',
      name: 'TGBYX Company',
      time: '2021-10-18',
      type: 'userInfo.type.optionC',
      statue: 'userInfo.statue.optionB',
    },
    {
      id: '4',
      bid: 'B',
      pid: 'D',
      name: 'GF Company',
      time: '2021-09-18',
      type: 'userInfo.type.optionB',
      statue: 'userInfo.statue.optionC',
    },
    {
      id: '5',
      bid: 'C',
      pid: 'C',
      name: 'Property management company',
      time: '2021-07-18',
      type: 'userInfo.type.optionA',
      statue: 'userInfo.statue.optionD',
    },
    {
      id: '6',
      bid: 'A',
      pid: 'C',
      name: 'Property management company',
      time: '2020-12-23',
      type: 'userInfo.type.optionA',
      statue: 'userInfo.statue.optionC',
    },
    {
      id: '7',
      bid: 'B',
      pid: 'C',
      name: 'GF Company',
      time: '2020-11-08',
      type: 'userInfo.type.optionB',
      statue: 'userInfo.statue.optionC',
    },
    {
      id: '8',
      bid: 'B',
      pid: 'C',
      name: 'WWWW Company',
      time: '2020-10-18',
      type: 'userInfo.type.optionB',
      statue: 'userInfo.statue.optionC',
    },
    {
      id: '9',
      bid: 'C',
      pid: 'D',
      name: 'WWWW Company',
      time: '2020-10-11',
      type: 'userInfo.type.optionC',
      statue: 'userInfo.statue.optionD',
    },
    {
      id: '10',
      bid: 'C',
      pid: 'D',
      name: 'TGBYX Company',
      time: '2020-06-18',
      type: 'userInfo.type.optionC',
      statue: 'userInfo.statue.optionD',
    },
  ],
});
