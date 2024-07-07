import { SequelizeModule } from '@nestjs/sequelize';
import { HttpException, Logger, Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from '@app/db';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PermissionGuard } from './permission/permission.guard';
import { RoleModule } from './role/role.module';
import { join } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { PermissionService } from './permission/permission.service';
import { Permission } from '@app/models';
import { MenuModule } from './menu/menu.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    UserModule,
    PermissionModule,
    AuthModule,
    RoleModule,
    MenuModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private user: UserService,
    private role: RoleService,
    private permission: PermissionService
  ) {}
  async onModuleInit() {
    const ROOT = __dirname;
    const LOCK_FILE = join(ROOT, 'lock');
    if (existsSync(LOCK_FILE)) {
      return;
    }
    // TODO: menu
    const modules = ['user', 'permission', 'role', 'menu'];
    const actions = ['add', 'remove', 'update', 'query'];
    const tasks = [];
    let permission;
    let isInit = true;
    try {
      permission = await this.permission.create(
        {
          name: '*',
          desc: 'super permission',
        },
        isInit
      );
    } catch (e) {
      const err = e as HttpException;
      Logger.error(err.message);
      Logger.error(`Please clear the database and try again`);
      process.exit(-1);
    }
    for (const module of modules) {
      for (const action of actions) {
        tasks.push(
          this.permission.create(
            {
              name: `${module}::${action}`,
              desc: '',
            },
            isInit
          )
        );
      }
    }
    const status = Promise.allSettled(tasks);
    const statusData = await status;
    const hasFail = statusData.some((data) => data.status === 'rejected');
    if (hasFail) {
      const fail: any[] = statusData.filter(
        (data) => data.status === 'rejected'
      );
      fail.forEach((data) => {
        Logger.error(`${data.reason}`);
      });
      Logger.error('Please clear the database and try again');
      process.exit(-1);
    }
    const role = await this.role.create(
      {
        name: 'admin',
        permissionIds: [permission.id],
        menuIds: [],
      },
      isInit
    );
    const user = await this.user.create(
      {
        email: 'admin@no-reply.com',
        password: 'admin',
        roleIds: [role.id],
        username: 'admin',
      },
      isInit
    );
    Logger.log(`[APP]: create admin user success`);
    Logger.log(`[APP]: email: ${user.email}`);
    Logger.log(`[APP]: password: 'admin'`);
    Logger.log('Enjoy!');
    writeFileSync(LOCK_FILE, '');
  }
}
