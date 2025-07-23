import { ApiProperty } from '@nestjs/swagger';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';

export class FarmCultureHarvestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  farmId: string;

  @ApiProperty()
  harvestId: string;

  @ApiProperty()
  cultureId: string;

  constructor(entity: FarmCultureHarvestEntity) {
    this.id = entity.id;
    this.farmId = entity.farm?.id ?? '';
    this.harvestId = entity.harvest?.id ?? '';
    this.cultureId = entity.culture?.id ?? '';
  }
}
