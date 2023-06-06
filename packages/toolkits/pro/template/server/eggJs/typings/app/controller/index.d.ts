// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportEmployee from '../../../app/controller/employee';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    employee: ExportEmployee;
    user: ExportUser;
  }
}
