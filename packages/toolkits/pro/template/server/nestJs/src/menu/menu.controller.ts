import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Delete, Param,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Permission } from '../public/permission.decorator';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';

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

  @Post()
  @Permission('menu::add')
  async createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.createMenu(dto);
  }

  @Patch()
  @Permission('menu::update')
  async updateMenu(@Body() dto: UpdateMenuDto) {
    return this.menuService.updateMenu(dto);
  }

  @Delete()
  @Permission('menu::remove')
  async deleteMenu(@Body() dto: DeleteMenuDto) {
    return this.menuService.deleteMenu(dto);
  }
}
