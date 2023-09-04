import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('getEmployee')
  getEmployee(@Query() searchInfo): Promise<Employee[]> {
    return this.employeesService.getEmployee(searchInfo);
  }

  @Get('getEmployee/:id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findOne(id);
  }
}
