import { Controller } from 'egg';
import BcryptUtils from '../utils/bcrypt-utils';

export default class UserController extends Controller {
  // 注册用户
  public async registerUser() {
    const { ctx, app } = this;
    const payload = ctx.request.body || {};
    const transaction = await ctx.model.transaction();
    try {
      this.logger.info('[ controller | user ] registerUser : 进入registerUser方法');
      // 校验参数
      const registerUserRule = {
        username: { type: 'email' },
        password: {
          type: 'string',
          format: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        },
      };
      const err = app.validator.validate(registerUserRule, payload);
      if (err?.length) {
        ctx.helper.commonJson(ctx, {}, 500, 'InvalidParameter');
        return;
      }
      const { username, password } = payload;
      // 判断用户是否已经存在
      const user = await ctx.service.user.getUserByName(username);
      if (user) {
        ctx.helper.commonJson(ctx, {}, 500, 'UserAlreadyExist');
        return;
      }
      const hash = BcryptUtils.genHash(password);
      // 创建用户
      const { id: userId } = await ctx.service.user.createUser({ username, password: hash }, { transaction });
      const userInfo = await ctx.service.user.createUserInfo({ username, userId }, { transaction });
      await transaction.commit();
      ctx.helper.commonJson(ctx, userInfo, 200);
    } catch (error) {
      await transaction.rollback();
      ctx.helper.commonJson(ctx, {}, 500, 'InternalError');
    }
  }

  // 获取用户信息
  public async getUserInfo() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { userId } = ctx.state.user || {};

    try {
      this.logger.info('[ controller | user ] getUserInfo : 进入getUserInfo方法');
      const userInfo = await ctx.service.user.getUserInfoById(id || userId);
      if (!userInfo) {
        ctx.helper.commonJson(ctx, {}, 500, 'UserNotFound');
        return;
      }
      ctx.helper.commonJson(ctx, userInfo, 200);
    } catch (error) {
      ctx.helper.commonJson(ctx, {}, 500, 'InternalError');
    }
  }

  // 登录
  public async login() {
    const { ctx, app } = this;
    const payload = ctx.request.body || {};
    try {
      this.logger.info('[ controller | user ] login : 进入login方法');
      // 校验参数格式
      const err = app.validator.validate(
        {
          username: { type: 'email' },
          password: { type: 'string' },
        },
        payload,
      );
      if (err?.length) {
        ctx.helper.commonJson(ctx, {}, 500, 'InvalidParameter');
        return;
      }

      // 用户是否存在
      const user = await ctx.service.user.getUserByName(payload.username);
      if (!user) {
        ctx.helper.commonJson(ctx, {}, 500, 'UserNotFound');
        return;
      }

      // 密码是否正确
      const match = BcryptUtils.compare(payload.password, user.password);
      if (!match) {
        ctx.helper.commonJson(ctx, {}, 500, 'ErrorPassword');
        return;
      }

      // 生成Token
      const { secret, sign } = this.app.config.jwt;
      const userInfo = await ctx.service.user.getUserInfoById(user.id);
      const token = this.app.jwt.sign(userInfo, secret, sign);
      ctx.helper.commonJson(ctx, { token, userInfo }, 200);
    } catch (error) {
      ctx.helper.commonJson(ctx, {}, 500, 'InternalError');
    }
  }

  public async updateUserInfo() {
    const { ctx, app } = this;
    const { userId } = ctx.state.user || {};
    const payload = ctx.request.body || {};
    try {
      this.logger.info('[ controller | user ] updateUserInfo : 进入updateUserInfo方法');

      // 校验参数
      const registerUserRule = {
        userId: { type: 'string?' },
        department: { type: 'string' },
        employeeType: { type: 'string' },
        job: { type: 'string' },
        probationStart: { type: 'string' },
        probationEnd: { type: 'string' },
        probationDuration: { type: 'string' },
        protocolStart: { type: 'string' },
        protocolEnd: { type: 'string' },
      };
      const err = app.validator.validate(registerUserRule, payload);
      if (err?.length) {
        ctx.helper.commonJson(ctx, {}, 500, 'InvalidParameter');
        return;
      }
      const id = payload.userId || userId;
      const user = await ctx.service.user.getUserInfoById(id);
      if (!user) {
        ctx.helper.commonJson(ctx, {}, 500, 'UserNotFound');
        return;
      }

      // 修改用户信息
      await ctx.service.user.updateUserInfo(id, payload);
      const userInfo = await ctx.service.user.getUserInfoById(id);
      ctx.helper.commonJson(ctx, userInfo, 200);
    } catch (error) {
      ctx.helper.commonJson(ctx, {}, 500, 'InternalError');
    }
  }
}
