import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CultureService } from './culture.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { CultureDto } from './dto/culture.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';

@Controller('cultures')
@TransformTo(CultureDto)
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  create(@Body() dto: CreateCultureDto) {
    return this.cultureService.create(dto);
  }

  @Get()
  findAll() {
    return this.cultureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCultureDto) {
    return this.cultureService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultureService.remove(id);
  }
}
