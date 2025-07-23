import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { HarvestDto } from './dto/harvest.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Harvests')
@TransformTo(HarvestDto)
@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiOkResponse({ type: HarvestDto })
  create(@Body() dto: CreateHarvestDto): Promise<HarvestDto> {
    return this.harvestService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all harvests' })
  @ApiOkResponse({ type: [HarvestDto] })
  findAll(): Promise<HarvestDto[]> {
    return this.harvestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a harvest by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: HarvestDto })
  findOne(@Param('id') id: string): Promise<HarvestDto> {
    return this.harvestService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a harvest by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: HarvestDto })
  remove(@Param('id') id: string): Promise<HarvestDto> {
    return this.harvestService.remove(id);
  }
}
