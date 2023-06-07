import { Service } from 'egg';

export default class User extends Service {
  public async getUserInfoById(user_id: string): Promise<any> {
    return this.ctx.model.UserInfo.findOne({ where: { user_id }, raw: true });
  }

  public async getUserByName(user_name: string): Promise<any> {
    return this.ctx.model.RegisterUser.findOne({ where: { user_name } });
  }

  public async createUser(params: { user_name: string; password: string }, options?): Promise<any> {
    return this.ctx.model.RegisterUser.create(params, options);
  }

  public async createUserInfo(info, options?): Promise<any> {
    return this.ctx.model.UserInfo.create(info, options);
  }
}
