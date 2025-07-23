import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmDto } from './dto/farm.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';

@ApiTags('Farms')
@TransformTo(FarmDto)
@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiOkResponse({ type: FarmDto })
  create(@Body() dto: CreateFarmDto): Promise<FarmDto> {
    return this.farmService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all farms' })
  @ApiOkResponse({ type: [FarmDto] })
  findAll(): Promise<FarmDto[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farm by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: FarmDto })
  findOne(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a farm by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: FarmDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFarmDto,
  ): Promise<FarmDto> {
    return this.farmService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farm by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: FarmDto })
  remove(@Param('id') id: string): Promise<FarmDto> {
    return this.farmService.remove(id);
  }
}
