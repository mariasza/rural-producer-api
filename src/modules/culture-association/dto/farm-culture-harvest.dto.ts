import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';

export class FarmCultureHarvestDto {
  id: string;
  farmId: string;
  harvestId: string;
  cultureId: string;

  constructor(entity: FarmCultureHarvestEntity) {
    this.id = entity.id;
    this.farmId = entity.farm?.id ?? '';
    this.harvestId = entity.harvest?.id ?? '';
    this.cultureId = entity.culture?.id ?? '';
  }
}
