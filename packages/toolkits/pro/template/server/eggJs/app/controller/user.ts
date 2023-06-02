import { Controller } from 'egg';

export default class UserController extends Controller {
  // 获取用户信息
  public async getUserInfo() {
    const { ctx } = this;
    const { params } = ctx;
    const { id } = params;

    try {
      this.logger.info(
        '[ controller | userInfo ] getUserInfo : 进入getUserInfo方法'
      );
      const result = await ctx.service.user.getUserInfo(id);
      ctx.helper.commonJson(
        ctx,
        {
          data: result.rows,
          total: result.count,
        },
        200
      );
    } catch (error) {
      console.log('error', error);
      // ctx.helper.exceptionHandling(ctx, error);
      ctx.helper.commonJson(ctx, {}, 500, 'CM087');
    }
  }
}
