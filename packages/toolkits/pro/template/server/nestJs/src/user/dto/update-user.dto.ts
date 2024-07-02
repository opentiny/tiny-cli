import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({
    message: '旧密码不能为空',
  })
  oldPassword: string;
  @IsNotEmpty({
    message: '新密码不能为空',
  })
  newPassword: string;
}
