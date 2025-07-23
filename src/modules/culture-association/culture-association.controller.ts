import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { CultureAssociationService } from './culture-association.service';
import { AssociateCulturesDto } from './dto/associate-cultures.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';
import { FarmCultureHarvestDto } from './dto/farm-culture-harvest.dto';

@Controller('cultures')
@TransformTo(FarmCultureHarvestDto)
export class CultureAssociationController {
  constructor(private readonly service: CultureAssociationService) {}

  @Post(':farmId/:harvestId')
  associateCultures(
    @Param('farmId') farmId: string,
    @Param('harvestId') harvestId: string,
    @Body() dto: AssociateCulturesDto,
  ) {
    return this.service.associateCultures(farmId, harvestId, dto);
  }

  @Get('farm/:farmId')
  findByFarm(@Param('farmId') farmId: string) {
    return this.service.findByFarm(farmId);
  }

  @Get('harvest/:harvestId')
  findByHarvest(@Param('harvestId') harvestId: string) {
    return this.service.findByHarvest(harvestId);
  }

  @Get(':farmId/:harvestId')
  findByFarmAndHarvest(
    @Param('farmId') farmId: string,
    @Param('harvestId') harvestId: string,
  ) {
    return this.service.findByFarmAndHarvest(farmId, harvestId);
  }
}
