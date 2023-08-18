import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((employee: CreateEmployeeDto) =>
                Promise.resolve({ id: '1', ...employee })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              })
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    employeesController = app.get<EmployeesController>(EmployeesController);
    employeesService = app.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(employeesController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should find all employees ', () => {
      employeesController.getEmployee();
      expect(employeesService.getEmployee).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a employee', () => {
      employeesController.findOne('1');
      expect(employeesService.findOne).toHaveBeenCalled();
      expect(employeesController.findOne('1')).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        id: '1',
      });
    });
  });

  describe('remove()', () => {
    it('should remove the employee', () => {
      employeesController.remove('2');
      expect(employeesService.remove).toHaveBeenCalled();
    });
  });
});
