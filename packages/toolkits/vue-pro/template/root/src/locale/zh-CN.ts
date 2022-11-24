import localekanban from '@/views/board/locale/zh-CN';
import localeHello from '@/views/cloud/hello/locale/zh-CN';
import localeContracts from '@/views/cloud/contracts/locale/zh-CN';
import localeSettings from './zh-CN/settings';

export default {
  'menu.board': '看板页',
  'menu.work': '首页',
  'menu.cloud': '云服务能力展示',
  ...localeHello,
  ...localeContracts,
  ...localeSettings,
  ...localekanban,
};
