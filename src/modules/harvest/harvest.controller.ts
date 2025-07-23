import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { HarvestDto } from './dto/harvest.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Harvests')
@TransformTo(HarvestDto)
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new harvest' })
  create(@Body() dto: CreateHarvestDto) {
    return this.harvestService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all harvests' })
  findAll() {
    return this.harvestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a harvest by ID' })
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a harvest by ID' })
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id);
  }
}
