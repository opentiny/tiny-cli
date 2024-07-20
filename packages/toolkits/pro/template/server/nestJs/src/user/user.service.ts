import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@app/models';
import { In, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { AuthService } from '../auth/auth.service';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import * as process from "process";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Role)
    private roleRep: Repository<Role>,
    private readonly authService: AuthService
  ) {}
  async create(createUserDto: CreateUserDto, isInit: boolean) {
    const { email, password, roleIds = [], username } = createUserDto;
    const userInfo = this.getUserInfo(email);
    if (isInit == true && (await userInfo)) {
      return userInfo;
    }
    if (await userInfo) {
      throw new HttpException('用户存在', HttpStatus.BAD_REQUEST);
    }
    const roles = this.roleRep.find({
      where: {
        id: In(roleIds),
      },
    });
    try {
      const user = this.userRep.create({
        email,
        password,
        name: username,
        role: await roles,
        deleteAt: 0,
      });
      return this.userRep.save(user);
    } catch (err) {
      throw new HttpException(
        (err as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  //获取所有用户信息
  async getAllUser(paginationQuery: PaginationQueryDto): Promise<any> {
    const { page, limit } = paginationQuery; // 从DTO获取分页参数
    return await paginate<User>(this.userRep, {
      page: Number(page) || Number(process.env.PAGITION_PAGE),
      limit: Number(limit) || Number(process.env.PAGITION_LIMIT),
    },{
      where: {deleteAt: 0},
      select: ['id', 'name', 'email', 'createTime', 'updateTime'],
    });
  }

  async getUserInfo(email: string, relations: string[] = []) {
    return this.userRep.findOne({
      where: { email, deleteAt: 0 },
      select: [
        'id',
        'name',
        'email',
        'createTime',
        'updateTime',
        'role',
        'deleteAt',
      ],
      relations,
    });
  }

  async getUserPermission(token: string, userInfo: User) {
    const { email } = userInfo;
    const { role } = (await this.getUserInfo(email, [
      'role',
      'role.permission',
    ])) ?? { role: [] as Role[] };
    const permission = role.flatMap((r) => r.permission);
    const permissionNames = permission.map((p) => p.name);
    return [...new Set([...permissionNames])];
  }

  //验证旧密码是否正确
  async verifyPassword(password: string, storedHash: string, salt: string) {
    const newHash = crypto
      .pbkdf2Sync(password, salt, 1000, 18, 'sha256')
      .toString('hex');
    return newHash === storedHash;
  }
  //修改密码后加密
  async encry(value: string, salt: string) {
    return crypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');
  }

  async deleteUser(email: string) {
    const user = await this.getUserInfo(email);
    if (user) {
      user.deleteAt = new Date().getTime(); // 设置软删除字段
      await this.userRep.save(user);
      return;
    }
  }

  //修改密码
  async updateUserPwd(updateUserDto: UpdateUserDto) {
    const { email, newPassword, oldPassword } = updateUserDto;
    const user = this.userRep.findOne({
      where: { email, deleteAt: 0 },
      select: [
        'id',
        'name',
        'email',
        'salt',
        'password',
        'createTime',
        'updateTime',
        'role',
        'deleteAt',
      ],
    });
    if (user) {
      if (
        !(await this.verifyPassword(
          oldPassword,
          (
            await user
          ).password,
          (
            await user
          ).salt
        ))
      ) {
        throw new HttpException('旧密码错误', HttpStatus.BAD_REQUEST);
      } else {
        (await user).password = await this.encry(
          newPassword,
          (
            await user
          ).salt
        );
        await this.userRep.save(await user);
        await this.authService.logout(email);
        return;
      }
    }
  }
}
