import { Service } from 'egg';

export default class User extends Service {
  public async getUserInfo(id: string): Promise<any> {
    return this.ctx.model.User.findOne({ where: { id } });
  }
}
