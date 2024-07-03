import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      // 刚刚的ConfigService要传入.env路径及文件名
      useValue: new ConfigService(`.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
