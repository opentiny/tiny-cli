// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportEmployee from '../../../app/model/employee';
import ExportRegisterUser from '../../../app/model/registerUser';
import ExportUserInfo from '../../../app/model/userInfo';

declare module 'egg' {
  interface IModel {
    Employee: ReturnType<typeof ExportEmployee>;
    RegisterUser: ReturnType<typeof ExportRegisterUser>;
    UserInfo: ReturnType<typeof ExportUserInfo>;
  }
}
