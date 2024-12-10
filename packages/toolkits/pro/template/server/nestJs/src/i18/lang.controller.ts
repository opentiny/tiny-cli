import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { I18LangService } from './lang.service';
import { CreateLang } from './dto/create-lang.dto';
import { Permission } from '../public/permission.decorator';
import { Reject } from '../public/reject.decorator';

@Controller('/lang')
export class I18nLangController {
  constructor(private readonly langService: I18LangService) {}

  @Reject()
  @Permission('lang::add')
  @Post('')
  createLang(@Body() data: CreateLang) {
    return this.langService.create(data);
  }

  @Permission('lang::query')
  @Get('')
  findAllLang() {
    return this.langService.findAll();
  }

  @Reject()
  @Permission('lang::update')
  @Patch(':id')
  updateLang(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateLang>
  ) {
    return this.langService.update(id, data);
  }

  @Reject()
  @Permission('lang::remove')
  @Delete(':id')
  removeLang(@Param('id', ParseIntPipe) id: number) {
    return this.langService.remove(id);
  }
}
