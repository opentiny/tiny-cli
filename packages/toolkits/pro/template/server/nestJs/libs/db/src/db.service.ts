import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class DbService implements TypeOrmOptionsFactory {
  // 注入config service取得env变量
  constructor(private readonly configService: ConfigService) {}
  // 回传TypeOrmOptions对象
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_HOST'),
      port: parseInt(this.configService.get('DATABASE_PORT')),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      synchronize: this.configService.get('DATABASE_SYNCHRONIZE') === 'true',
      autoLoadEntities:
        this.configService.get('DATABASE_AUTOLOADENTITIES') === 'true',
    };
  }
}
