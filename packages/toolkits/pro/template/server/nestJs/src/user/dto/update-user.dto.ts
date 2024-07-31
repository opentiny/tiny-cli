import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  oldPassword: string;
  newPassword: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email: string;
  @IsNotEmpty({
    message: '职业不能为空',
  })
  roleIds: number[] = [];
  @IsNotEmpty({
    message: '部门不能为空',
  })
  department: string;
  @IsNotEmpty({
    message: '招聘类型不能为空',
  })
  employeeType: string;
  @IsNotEmpty({
    message: '试用起始日期不能为空',
  })
  probationStart: string;
  @IsNotEmpty({
    message: '试用结束日期不能为空',
  })
  probationEnd: string;
  @IsNotEmpty({
    message: '试用期时长不能为空',
  })
  probationDuration: string;
  @IsNotEmpty({
    message: '合同起始日期不能为空',
  })
  protocolStart: string;
  @IsNotEmpty({
    message: '试用结束日期不能为空',
  })
  protocolEnd: string;
  @IsNotEmpty({
    message: '地址不能为空',
  })
  address: string;
  @IsNotEmpty({
    message: '状态不能为空',
  })
  status: number;
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  name: string;
}
