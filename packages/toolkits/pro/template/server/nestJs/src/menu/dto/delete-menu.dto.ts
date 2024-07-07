import { IsNotEmpty } from 'class-validator';

export class DeleteMenuDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
}
