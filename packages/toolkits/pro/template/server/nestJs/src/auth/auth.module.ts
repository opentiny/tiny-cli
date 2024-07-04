import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/models';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigService } from '../../libs/config/config.service';
import { ConfigModule } from '../../libs/config/config.module';
import { AuthGuard } from './auth.guard';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        global: true,
        signOptions: {
          expiresIn: '2h',
        },
      }),
      global: true,
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AuthModule {}
