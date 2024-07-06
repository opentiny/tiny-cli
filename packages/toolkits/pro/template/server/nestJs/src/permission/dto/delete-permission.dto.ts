import { IsNotEmpty } from 'class-validator';

export class DeletePermissionDto {
  @IsNotEmpty()
  name: string;
}
