import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './models/employee.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee
  ) {}

  async getEmployee(searchInfo): Promise<Employee[]> {
    try {
      const result = await this.employeeModel.findAll({ where: searchInfo });
      return result;
    } catch (error) {}
  }

  findOne(id: string): Promise<Employee> {
    return this.employeeModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.findOne(id);
    await employee.destroy();
  }
}
