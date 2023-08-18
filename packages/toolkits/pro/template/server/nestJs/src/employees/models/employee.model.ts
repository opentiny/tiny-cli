import { IntegerDataType } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Employee extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  employeeNo: string;

  @Column
  department: string;

  @Column
  departmentLevel: string;

  @Column
  status: string;

  @Column
  workbenchName: string;

  @Column
  project: string;

  @Column
  type: string;

  @Column
  address: string;

  @Column
  roles: string;

  @Column
  lastUpdateUser: string;

  @Column
  createTime: string;
}
