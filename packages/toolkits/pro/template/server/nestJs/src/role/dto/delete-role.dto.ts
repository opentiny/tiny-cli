import { IsNotEmpty } from 'class-validator';

export class DeleteRoleDto {
  @IsNotEmpty()
  name: string;
}
