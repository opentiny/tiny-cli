import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbService implements TypeOrmOptionsFactory {
  // 注入config service取得env变量
  constructor() {}
  // 回传TypeOrmOptions对象
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES === 'true',
    };
  }
}
