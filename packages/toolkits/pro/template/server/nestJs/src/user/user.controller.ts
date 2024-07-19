import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Permission } from '../public/permission.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('reg')
  @Permission('user::add')
  async register(@Body() body: CreateUserDto) {
    return this.userService.create(body, false);
  }
  @Get('/info/:email')
  async getUserInfo(@Param('email') email: string) {
    return this.userService.getUserInfo(email, ['role', 'role.permission']);
  }
  @Delete('/:email')
  @Permission('user::remove')
  async delUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
  @Patch('/update')
  @Permission('user::update')
  async UpdateUser(@Body() body: UpdateUserDto) {
    return this.userService.updateUserPwd(body);
  }
  @Get()
  @Permission('user::query')
  async getAllUser(
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.userService.getAllUser(paginationQuery);
  }
}
