import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
export class DeleteMenuDto extends PartialType(CreateMenuDto) {
  @IsNotEmpty()
  id: number;
}
