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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Farms')
@TransformTo(FarmDto)
@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new farm' })
  create(@Body() dto: CreateFarmDto): Promise<FarmDto> {
    return this.farmService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all farms' })
  findAll(): Promise<FarmDto[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farm by ID' })
  findOne(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a farm by ID' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFarmDto,
  ): Promise<FarmDto> {
    return this.farmService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farm by ID' })
  remove(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.remove(id);
  }
}
