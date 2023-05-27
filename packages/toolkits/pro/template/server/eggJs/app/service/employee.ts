import { Service } from 'egg';

export default class Employee extends Service {
  public async getEmployee(options): Promise<any> {
    return this.ctx.model.Employee.findAndCountAll(options);
  }
}
