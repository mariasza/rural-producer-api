import { HarvestEntity } from '@/common/entities/harvest.entity';

export class HarvestDto {
  id: string;
  name: string;
  year: number;

  static fromEntity(entity: HarvestEntity): HarvestDto {
    const dto = new HarvestDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.year = entity.year;
    return dto;
  }
}
