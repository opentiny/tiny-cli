import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Permission } from '../public/permission.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdatePwdAdminDto } from './dto/update-pwd-admin.dto';
import { UpdatePwdUserDto } from './dto/update-pwd-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../.generate/i18n.generated';
import { Reject } from '../public/reject.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Reject()
  @Post('reg')
  @Permission('user::add')
  async register(@Body() body: CreateUserDto) {
    return this.userService.create(body, false);
  }
  @Get('/info/:email?')
  async getUserInfo(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Req() request: Request & RequestUser,
    @Param('email') email?: string
  ) {
    const _email = email ? email : request.user.email;
    if (!_email) {
      throw new HttpException(
        i18n.t('exception.common.unauth', { lang: I18nContext.current().lang }),
        HttpStatus.UNAUTHORIZED
      );
    }
    return this.userService.getUserInfo(_email, ['role', 'role.permission']);
  }

  @Reject()
  @Delete('/:email')
  @Permission('user::remove')
  async delUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @Reject()
  @Patch('/update')
  @Permission('user::update')
  async UpdateUser(@Body() body: UpdateUserDto) {
    return this.userService.updateUserInfo(body);
  }
  @Get()
  @Permission('user::query')
  async getAllUser(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('name') name?: string,
    @Query('role', new DefaultValuePipe([]), ParseArrayPipe) role?: number[],
    @Query('email') email?: string
  ) {
    return this.userService.getAllUser(paginationQuery, name, role, email);
  }

  @Reject()
  @Patch('/admin/updatePwd')
  @Permission('user::password::force-update')
  async updatePwdAdmin(@Body() body: UpdatePwdAdminDto) {
    return this.userService.updatePwdAdmin(body);
  }

  @Reject()
  @Patch('/updatePwd')
  @Permission('user::update')
  async updatePwdUser(@Body() body: UpdatePwdUserDto) {
    return this.userService.updatePwdUser(body);
  }
}
