import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;
  @IsArray()
  @IsNotEmpty()
  permissionIds: number[];
  @IsArray()
  @IsNotEmpty()
  menuIds: number[];
}
