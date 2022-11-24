import personalize from './en-US/personalize';
import login from './en-US/login';
import register from './en-US/register';
import sideSetting from './en-US/side-setting';
import header from './en-US/header';
import footer from './en-US/footer';
import authGuard from './en-US/auth-guard';
import notice from './en-US/notice';
import page from './en-US/page';
import consoleHome from './en-US/console-home';
import contracts from './en-US/service-list';

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
