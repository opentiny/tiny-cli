import { IsNotEmpty } from 'class-validator';

export class LogoutAuthDto {
  @IsNotEmpty()
  token: string;
}
