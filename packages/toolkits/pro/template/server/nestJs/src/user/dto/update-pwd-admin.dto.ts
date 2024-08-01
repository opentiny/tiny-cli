import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePwdAdminDto extends PartialType(CreateUserDto) {
  email: string;
  @IsNotEmpty({
    message: '新密码不能为空',
  })
  newPassword: string;
  confirmNewPassword?: string;
}
