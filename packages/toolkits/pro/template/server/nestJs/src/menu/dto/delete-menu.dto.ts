import { IsNotEmpty } from 'class-validator';
export class DeleteMenuDto {
  @IsNotEmpty()
  id: number;
  parentId: number | null;
}
