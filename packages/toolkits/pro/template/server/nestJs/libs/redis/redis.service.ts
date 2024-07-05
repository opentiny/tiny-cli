import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor(private readonly configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: parseInt(this.configService.get('REDIS_PORT')),
    });
  }
  async setUserToken(
    email: string,
    token: string,
    ttl: number
  ): Promise<string | null> {
    return this.redisClient.set(`user:${email}:token`, token, 'EX', ttl);
  }

  async getUserToken(email: string): Promise<string | null> {
    return this.redisClient.get(`user:${email}:token`);
  }

  async delUserToken(email: string): Promise<void> {
    //退出登录后，将token从Redis删除
    await this.redisClient.del(`user:${email}:token`);
    return;
  }
}
