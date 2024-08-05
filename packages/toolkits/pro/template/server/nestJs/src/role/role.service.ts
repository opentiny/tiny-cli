import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, Permission, Role } from '@app/models';
import { DataSource, In, Repository } from 'typeorm';
import { convertToTree } from "../menu/menu.service";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly role: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permission: Repository<Permission>,
    @InjectRepository(Menu)
    private readonly menu: Repository<Menu>
  ) {}
  async create(createRoleDto: CreateRoleDto, isInit: boolean) {
    const { name, permissionIds = [], menuIds = [] } = createRoleDto;
    const roleInfo = this.role.findOne({
      where: {
        name,
      },
    });
    if (isInit == true && (await roleInfo)) {
      return roleInfo;
    }
    if (await roleInfo) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }
    const permissions = await this.permission.find({
      where: {
        id: In(permissionIds),
      },
    });
    const menus = await this.menu.find({
      where: {
        id: In(menuIds),
      },
    });
    return this.role.save({ name, permission: permissions, menus });
  }
  findAll() {
    return this.role.find()
  }

  async findAllDetail() {
    const roleInfo = await this.role
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menus')
      .leftJoinAndSelect('role.permission', 'permission')
      .getMany();
    const menuTree = [] as any;
    for(const item of roleInfo){
      const temp = convertToTree(item.menus);
      menuTree.push(temp)
    }

    return {
      roleInfo: roleInfo,
      menuTree: menuTree,
    }
  }

  async findOne(id: string) {
    const roleInfo = await this.role.find({
      where: {
        id: parseInt(id),
      },
    });
    if (roleInfo.length===0) {
      throw new HttpException('角色不存在', HttpStatus.NOT_FOUND);
    }
    return roleInfo;
  }

  async update(data: UpdateRoleDto) {
    const permission = await this.permission.find({
      where: {
        id: In(data.permissionIds ?? []),
      },
    });
    const menus = await this.menu.find({
      where: {
        id: In(data.menuIds ?? []),
      },
    });
    const { id, name } = data;
    const roleInfo = await this.role.find({
      where: {
        id: id,
      },
    });
    if (roleInfo.length === 0) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    const role = roleInfo[0];
    role.name = name;
    role.permission = permission.length ? permission : undefined;
    role.menus = menus.length ? menus : undefined;
    return this.role.save(role);
  }
  async delete(id: number) {
    const role = await this.role.find({
      where: {
        id: id,
      },
    });
    return this.role.remove(role);
  }
}
