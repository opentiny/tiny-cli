import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Permission } from '../public/permission.decorator';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Reject } from '../public/reject.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/role/:email')
  async getMenus(@Param('email') email: string) {
    return this.menuService.findRoleMenu(email);
  }

  @Get()
  @Permission('menu::query')
  async getAllMenus() {
    return this.menuService.findAllMenu();
  }

  @Reject()
  @Post()
  @Permission('menu::add')
  async createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.createMenu(dto, false);
  }

  @Reject()
  @Patch()
  @Permission('menu::update')
  async updateMenu(@Body() dto: UpdateMenuDto) {
    return this.menuService.updateMenu(dto);
  }

  @Reject()
  @Delete()
  @Permission('menu::remove')
  async deleteMenu(
    @Query('id') id: number,
    @Query('parentId') parentId: number
  ) {
    return this.menuService.deleteMenu(id, parentId);
  }
}
