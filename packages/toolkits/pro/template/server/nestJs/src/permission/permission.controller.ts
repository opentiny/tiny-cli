import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from '../public/permission.decorator';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Reject } from '../public/reject.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Reject()
  @Permission('permission::add')
  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto, false);
  }

  @Reject()
  @Patch()
  @Permission('permission::update')
  update(@Body() dto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(dto);
  }

  @Get()
  @Permission('permission::get')
  find(
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe('0'), ParseIntPipe) limit: number,
    @Query('name') name?: string
  ) {
    return this.permissionService.findPermission(page, limit, name);
  }

  @Reject()
  @Delete('/:id')
  @Permission('permission::remove')
  del(@Param('id') id: number) {
    return this.permissionService.delPermission(id);
  }
}
