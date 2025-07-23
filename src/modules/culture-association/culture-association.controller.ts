import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CultureAssociationService } from './culture-association.service';
import { AssociateCulturesDto } from './dto/associate-cultures.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';
import { FarmCultureHarvestDto } from './dto/farm-culture-harvest.dto';

@ApiTags('Culture Association')
@Controller('cultures')
@TransformTo(FarmCultureHarvestDto)
export class CultureAssociationController {
  constructor(private readonly service: CultureAssociationService) {}

  @Post(':farmId/:harvestId')
  @ApiOperation({ summary: 'Associate cultures with a farm and harvest' })
  @ApiParam({ name: 'farmId', type: 'string' })
  @ApiParam({ name: 'harvestId', type: 'string' })
  associateCultures(
    @Param('farmId') farmId: string,
    @Param('harvestId') harvestId: string,
    @Body() dto: AssociateCulturesDto,
  ) {
    return this.service.associateCultures(farmId, harvestId, dto);
  }

  @Get('farm/:farmId')
  @ApiOperation({ summary: 'Get culture associations by farm ID' })
  @ApiParam({ name: 'farmId', type: 'string' })
  findByFarm(@Param('farmId') farmId: string) {
    return this.service.findByFarm(farmId);
  }

  @Get('harvest/:harvestId')
  @ApiOperation({ summary: 'Get culture associations by harvest ID' })
  @ApiParam({ name: 'harvestId', type: 'string' })
  findByHarvest(@Param('harvestId') harvestId: string) {
    return this.service.findByHarvest(harvestId);
  }

  @Get(':farmId/:harvestId')
  @ApiOperation({
    summary: 'Get culture associations by farm ID and harvest ID',
  })
  @ApiParam({ name: 'farmId', type: 'string' })
  @ApiParam({ name: 'harvestId', type: 'string' })
  findByFarmAndHarvest(
    @Param('farmId') farmId: string,
    @Param('harvestId') harvestId: string,
  ) {
    return this.service.findByFarmAndHarvest(farmId, harvestId);
  }
}
