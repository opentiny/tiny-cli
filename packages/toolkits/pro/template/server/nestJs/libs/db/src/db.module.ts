import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DbService,
    }),
    ConfigModule,
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
