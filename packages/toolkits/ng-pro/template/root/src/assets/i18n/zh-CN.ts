import personalize from './zh-CN/personalize';
import login from './zh-CN/login';
import register from './zh-CN/register';
import sideSetting from './zh-CN/side-setting';
import header from './zh-CN/header';
import footer from './zh-CN/footer';
import authGuard from './zh-CN/auth-guard';
import notice from './zh-CN/notice';
import page from './zh-CN/page';
import consoleHome from './zh-CN/console-home';
import contracts from './zh-CN/service-list';

export default {
  ...personalize,
  ...login,
  ...register,
  ...sideSetting,
  ...header,
  ...footer,
  ...authGuard,
  ...notice,
  ...page,
  ...consoleHome,
  ...contracts
};
