import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from '../public/permission.decorator';
import { Reject } from '../public/reject.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Reject()
  @Permission('role::add')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto, false);
  }

  @Permission('role::query')
  @Get()
  getAllRole() {
    return this.roleService.findAll();
  }

  @Permission('role::query')
  @Get('/detail')
  getAllRoleDetail(
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page?: number,
    @Query(
      'limit',
      new DefaultValuePipe(process.env.PAGINATION_LIMIT),
      ParseIntPipe
    )
    limit?: number,
    @Query('name') name?: string
  ) {
    return this.roleService.findAllDetail(page, limit, name);
  }

  @Reject()
  @Patch()
  @Permission('role::update')
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.roleService.update(dto);
  }

  @Reject()
  @Delete('/:id')
  @Permission('role::remove')
  deleteRole(@Param('id') id: number) {
    return this.roleService.delete(id);
  }

  @Get('/info/:id')
  getRoleInfo(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
