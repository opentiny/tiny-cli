import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Permission } from '../public/permission.decorator';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus(@Req() req) {
    return this.menuService.findAll(req.user);
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
