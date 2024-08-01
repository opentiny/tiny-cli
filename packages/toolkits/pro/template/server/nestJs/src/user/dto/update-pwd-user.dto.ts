import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePwdUserDto extends PartialType(CreateUserDto) {
  email: string;
  token: string;
  @IsNotEmpty({
    message: '新密码不能为空',
  })
  newPassword: string;
  @IsNotEmpty({
    message: '旧密码不能为空',
  })
  oldPassword?: string;
}
