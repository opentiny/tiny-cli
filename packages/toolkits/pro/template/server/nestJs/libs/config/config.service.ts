import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private envConfig: { [key: string]: string };

  constructor() {
    // 读取.env文件，通过dotenv.parse方法形成key-value pairs
    // 存在envConfig变量里
    this.envConfig = dotenv.parse(fs.readFileSync(`.env`));
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
