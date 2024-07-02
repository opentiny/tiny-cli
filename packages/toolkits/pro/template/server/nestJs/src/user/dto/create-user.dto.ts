import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
  roleIds: number[] = [];
}
