import localekanban from '@/views/board/locale/en-US';
import localeHello from '@/views/cloud/hello/locale/en-US';
import localeContracts from '@/views/cloud/contracts/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'menu.board': 'Dashboard Page',
  'menu.work': 'workbench',
  'menu.cloud': 'Cloud service capability display',
  ...localeHello,
  ...localeContracts,
  ...localeSettings,
  ...localekanban,
};
