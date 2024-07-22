import { IsOptional } from 'class-validator';
import { Transform} from 'class-transformer';
import * as process from "process";
export class PaginationQueryDto {
  @IsOptional()
  @Transform(value => isNaN(Number(value)) ? 1 : Number(value))
  page?: number = Number(process.env.PAGITION_PAGE);

  @IsOptional()
  @Transform(value => isNaN(Number(value)) ? 10 : Number(value))
  limit?: number = Number(process.env.PAGITION_PAGE);
}
