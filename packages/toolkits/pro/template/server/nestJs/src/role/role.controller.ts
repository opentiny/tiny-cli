import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { Permission } from '../public/permission.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permission('role::add')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto, false);
  }

  @Permission('role::get')
  @Get()
  getAllRole() {
    return this.roleService.findAll();
  }

  @Patch()
  @Permission('role::update')
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.roleService.update(dto);
  }

  @Delete()
  @Permission('role::remove')
  deleteRole(@Body() dto: DeleteRoleDto) {
    return this.roleService.delete(dto);
  }

  @Permission('role::get')
  @Get('/info/:id')
  getRoleInfo(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
