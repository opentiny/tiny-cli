// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCsrf from '../../../app/controller/csrf';
import ExportEmployee from '../../../app/controller/employee';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    csrf: ExportCsrf;
    employee: ExportEmployee;
    user: ExportUser;
  }
}
