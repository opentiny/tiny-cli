import { Service } from 'egg';

export default class User extends Service {
  public async getUserInfoById(user_id: string): Promise<any> {
    return this.ctx.model.UserInfo.findOne({ where: { user_id }, raw: true });
  }

  public async getUserByName(username: string): Promise<any> {
    return this.ctx.model.RegisterUser.findOne({ where: { username } });
  }

  public async createUser(params: { username: string; password: string }, options?): Promise<any> {
    return this.ctx.model.RegisterUser.create(params, options);
  }

  public async createUserInfo(info, options?): Promise<any> {
    return this.ctx.model.UserInfo.create(info, options);
  }

  public async updateUserInfo(userId: string, info): Promise<any> {
    return this.ctx.model.UserInfo.update(info, { where: { userId } });
  }
}
