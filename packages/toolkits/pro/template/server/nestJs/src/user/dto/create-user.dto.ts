import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  name: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
  roleIds: number[] = [];
  department?: string;
  employeeType?: string;
  probationStart?: string;
  probationEnd?: string;
  probationDuration?: string;
  protocolStart?: string;
  protocolEnd?: string;
  address?: string;
  status?: number;
}
