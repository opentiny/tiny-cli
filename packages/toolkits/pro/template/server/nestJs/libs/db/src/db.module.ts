import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbService,
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
