import { Application } from 'egg';

export default (app: Application) => {
  // 数据库模型同步，只建议在开发环境下使用
  if (app.config.env === 'local') {
    try {
      app.beforeStart(async () => {
        await app.model.sync({ alter: true });
      });
    } catch (error) {
      console.error('数据库同步失败，请检查数据库配置信息或手动创建数据库', error);
    }
  }
};
