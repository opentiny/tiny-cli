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
  ParseArrayPipe,
} from '@nestjs/common';
import { I18Service } from './i18.service';
import { CreateI18Dto } from './dto/create-i18.dto';
import { UpdateI18Dto } from './dto/update-i18.dto';
import { I18LangService } from './lang.service';
import { Permission } from '../public/permission.decorator';
import { Reject } from '../public/reject.decorator';

@Controller('i18')
export class I18Controller {
  constructor(private readonly i18Service: I18Service) {}

  @Reject()
  @Permission('i18n::add')
  @Post()
  create(@Body() createI18Dto: CreateI18Dto) {
    return this.i18Service.create(createI18Dto);
  }

  @Get('format')
  getFormat(@Query('lang') lang: string) {
    return this.i18Service.getFormat(lang);
  }

  @Permission('i18n::query')
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit?: number,
    @Query('all', ParseIntPipe) all?: number,
    @Query('lang', new DefaultValuePipe([]), ParseArrayPipe) lang?: number[],
    @Query('key') key?: string,
    @Query('content') content?: string
  ) {
    return this.i18Service.findAll(
      page,
      limit,
      Boolean(all),
      lang,
      content,
      key
    );
  }

  @Permission('i18n::query')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.i18Service.findOne(id);
  }

  @Reject()
  @Permission('i18n::update')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateI18Dto: UpdateI18Dto
  ) {
    return this.i18Service.update(id, updateI18Dto);
  }

  @Reject()
  @Permission('i18n::remove')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.i18Service.remove(id);
  }
}
