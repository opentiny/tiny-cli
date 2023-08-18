import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';
import { getModelToken } from '@nestjs/sequelize';

const employeesArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
  },
];

const oneEmployee = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
};

describe('EmployeeService', () => {
  let service: EmployeesService;
  let model: typeof Employee;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getModelToken(Employee),
          useValue: {
            findAll: jest.fn(() => employeesArray),
            findOne: jest.fn(),
            create: jest.fn(() => oneEmployee),
            remove: jest.fn(),
            destroy: jest.fn(() => oneEmployee),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    model = module.get<typeof Employee>(getModelToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of employees', async () => {
      const employees = await service.getEmployee();
      expect(employees).toEqual(employeesArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single employee', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toBeCalledWith({ where: { id: '1' } });
    });
  });

  describe('remove()', () => {
    it('should remove a employee', async () => {
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const retVal = await service.remove('2');
      expect(findSpy).toBeCalledWith({ where: { id: '2' } });
      expect(retVal).toBeUndefined();
    });
  });
});
