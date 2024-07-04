import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { encry, User } from '@app/models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private redisClient: Redis;
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private jwtService: JwtService
  ) {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async getToken(userId: string): Promise<string | null> {
    return this.redisClient.get(`user:${userId}:token`);
  }

  async logout(email: string): Promise<void> {
    //退出登录后，将token从Redis删除
    await this.redisClient.del(`user:${email}:token`);
    return;
  }

  async login(dto: CreateAuthDto) {
    const { email, password } = dto;
    const userInfo = await this.user.findOne({ where: { email } });
    if (encry(password, userInfo.salt) !== userInfo.password) {
      throw new HttpException('密码或邮箱错误', HttpStatus.BAD_REQUEST);
    }
    const payload = {
      email,
    };
    const token = this.jwtService.signAsync(payload);
    //将token设置到Redis中，有效期2h
    await this.redisClient.set(
      `user:${email}:token`,
      await token,
      'EX',
      60 * 60 * 2
    );
    return token;
  }
}
