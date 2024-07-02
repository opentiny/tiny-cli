import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  order: number;
  @IsNotEmpty()
  menuType: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  path: string;
  @IsNotEmpty()
  component: string;
  @IsNotEmpty()
  icon: string;

  parentId: number | null;
}
