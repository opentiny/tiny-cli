import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from '../public/public.decorator';
import { Permission } from '../public/permission.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body);
  }

  @Permission('read')
  @Get('test')
  test() {
    return true;
  }
}
