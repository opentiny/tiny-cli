import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // todo: init database connect
  // router.post('/v1/database/init');

  // Must be called before all other interfaces
  router.get('/v1/setcsrf', controller.csrf.index);

  router.post('/v1/employee/getEmployee', controller.employee.getEmployee);

  router.post('/v1/user/register', controller.user.registerUser);

  router.get('/v1/user/userInfo/:id', controller.user.getUserInfo);

  router.get('/v1/user/userInfo', controller.user.getUserInfo);

  router.post('/v1/user/login', controller.user.login);

  router.put('/v1/user/userInfo', controller.user.updateUserInfo);
};
