import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@app/models';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permission: Repository<Permission>
  ) {}
  async create(createPermissionDto: CreatePermissionDto, isInit: boolean) {
    const { name, desc } = createPermissionDto;
    const permissionInfo = this.permission.findOne({
      where: { name },
    });
    if (isInit == true && (await permissionInfo)) {
      return permissionInfo;
    }
    if ((await permissionInfo) && isInit == false) {
      throw new HttpException(
        `权限字段 ${name} 已经存在`,
        HttpStatus.BAD_REQUEST
      );
    }
    const permission = await this.permission.save({ name, desc });
    return permission;
  }
  async updatePermission(dto: UpdatePermissionDto) {
    const { name, desc, id } = dto;
    const permissionInfo = await this.permission.findOne({
      where: { id },
    });
    if (!permissionInfo) {
      throw new HttpException('无法找到权限字段', HttpStatus.NOT_FOUND);
    }
    return this.permission.update(id, { name, desc });
  }
  async findPermission() {
    return this.permission.find();
  }
  async delPermission(id: number) {
    const permissionInfo = await this.permission.findOne({
      where: { id },
    });
    return this.permission.remove(permissionInfo);
  }
}
