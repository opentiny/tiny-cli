import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { Public } from '../public/public.decorator';
import { Permission } from '../public/permission.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body);
  }
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Body() body: LogoutAuthDto) {
    return this.authService.logout(body.token);
  }
}
