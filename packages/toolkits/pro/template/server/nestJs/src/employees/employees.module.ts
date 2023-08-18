import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
