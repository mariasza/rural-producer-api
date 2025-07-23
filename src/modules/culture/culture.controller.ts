import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CultureService } from './culture.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { CultureDto } from './dto/culture.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';

@ApiTags('Cultures')
@Controller('cultures')
@TransformTo(CultureDto)
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new culture' })
  create(@Body() dto: CreateCultureDto) {
    return this.cultureService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cultures' })
  findAll() {
    return this.cultureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a culture by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.cultureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a culture by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  update(@Param('id') id: string, @Body() dto: UpdateCultureDto) {
    return this.cultureService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a culture by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  remove(@Param('id') id: string) {
    return this.cultureService.remove(id);
  }
}
