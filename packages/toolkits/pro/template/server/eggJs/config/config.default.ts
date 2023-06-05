import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import * as fs from 'fs';

// 获取database配置
const dbFile = path.join(__dirname, '../app/database/db.config.json');
const dbJson = fs.readFileSync(dbFile, 'utf-8');
const dbConfig = JSON.parse(dbJson)

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597038250886_3781';

  // add your egg config in here
  config.middleware = [];

  config.sequelize = {
    ...dbConfig
  };

  // the return config will combines to EggAppConfig
  return {
    ...config
  };
};
