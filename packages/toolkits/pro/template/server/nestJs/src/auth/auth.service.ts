import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { encry, User } from '@app/models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private jwtService: JwtService
  ) {}
  async login(dto: CreateAuthDto) {
    const { email, password } = dto;
    const userInfo = await this.user.findOne({ where: { email } });
    if (encry(password, userInfo.salt) !== userInfo.password) {
      throw new HttpException('密码或邮箱错误', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      email,
    };
    return this.jwtService.signAsync(payload);
  }
}
