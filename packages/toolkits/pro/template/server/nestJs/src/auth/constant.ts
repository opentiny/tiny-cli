//import {ConfigService} from "../../libs/config/config.service";
// import { JwtModuleOptions,JwtOptionsFactory } from '@nestjs/jwt';
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class JwtConfig implements JwtOptionsFactory{
//   // 注入config service取得env变量
//   constructor(private readonly configService: ConfigService) {}
//   // 回传JwtModuleOptions对象
//   createJwtOptions(): JwtModuleOptions {
//     return {
//       secret: this.configService.get("AUTH_SECRET"),
//       signOptions: {
//         expiresIn: '2h',
//       },
//       global: true,
//     };
//   }
// }
// export const jwtConstants = (configService) => ({
//   secret: configService.get("AUTH_SECRET"),
// });
