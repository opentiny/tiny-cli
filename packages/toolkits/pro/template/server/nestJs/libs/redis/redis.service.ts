import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
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
