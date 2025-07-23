import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmDto } from './dto/farm.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';
import { FarmEntity } from '@/common/entities/farm.entity';

@Controller('farms')
@TransformTo(FarmDto)
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  create(@Body() dto: CreateFarmDto): Promise<FarmDto> {
    return this.farmService.create(dto);
  }

  @Get()
  findAll(): Promise<FarmDto[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFarmDto,
  ): Promise<FarmDto> {
    return this.farmService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.remove(id);
  }
}
