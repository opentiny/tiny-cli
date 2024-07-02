import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ospp-nest',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
