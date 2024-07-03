import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { User } from '@app/models';
import { PERMISSION_KEYS } from '../public/permission.decorator';

interface CustomReq extends Request {
  user: User;
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private userSerivce: UserService) {}
  async canActivate(ctx: ExecutionContext) {
    const req: CustomReq = ctx.switchToHttp().getRequest();
    const requiredPermission = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEYS,
      [ctx.getClass(), ctx.getHandler()]
    );
    if (!requiredPermission || requiredPermission.length === 0) {
      return true;
    }
    const [, token] = (req.headers.authorization ?? '').split(' ') ?? ['', ''];
    const permissionNames = await this.userSerivce.getUserPermission(
      token,
      req.user
    );
    const isContainedPermission = requiredPermission.every((item) =>
      permissionNames.includes(item)
    );
    if (permissionNames.includes('*')) {
      return true;
    }
    if (!isContainedPermission) {
      throw new HttpException('权限不足', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
