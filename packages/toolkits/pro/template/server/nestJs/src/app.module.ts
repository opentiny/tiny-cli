import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: '',
      host: '',
      port: '',
      username: '',
      password: '',
      database: '',
      autoLoadModels: true,
      synchronize: true,
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
