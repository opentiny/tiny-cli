import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import {IsNotEmpty} from "class-validator";

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsNotEmpty()
  id: number;
}
