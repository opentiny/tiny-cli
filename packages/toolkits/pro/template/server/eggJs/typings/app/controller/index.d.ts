// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportEmployee from '../../../app/controller/employee';

declare module 'egg' {
  interface IController {
    employee: ExportEmployee;
  }
}
