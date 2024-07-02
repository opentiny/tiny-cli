import { SequelizeModule } from '@nestjs/sequelize';
//import { EmployeesModule } from './employees/employees.module';
import { HttpException, Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    // SequelizeModule.forRoot({
    //   dialect: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    //EmployeesModule,
    DbModule,
    UserModule,
    PermissionModule,
    AuthModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
    try {
      permission = await this.permission.create({
        name: '*',
        desc: 'super permission',
      });
    } catch (e) {
      const err = e as HttpException;
      Logger.error(err.message);
      Logger.error(`Please clear the database and try again`);
      process.exit(-1);
    }
    for (const module of modules) {
      for (const action of actions) {
        tasks.push(
          this.permission.create({
            name: `${module}::${action}`,
            desc: '',
          })
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
    const role = await this.role.create({
      name: 'admin',
      permissionIds: [permission.id],
      menuIds: [],
    });
    const user = await this.user.create({
      email: 'admin@no-reply.com',
      password: 'admin',
      roleIds: [role.id],
      username: 'admin',
    });
    Logger.log(`[APP]: create admin user success`);
    Logger.log(`[APP]: email: ${user.email}`);
    Logger.log(`[APP]: password: ${user.password}`);
    Logger.log('Enjoy!');
    writeFileSync(LOCK_FILE, '');
  }
}
