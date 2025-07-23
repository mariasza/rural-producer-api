import { FarmEntity } from '@/common/entities/farm.entity';

export class FarmDto {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;

  static fromEntity(entity: FarmEntity): FarmDto {
    const dto = new FarmDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.city = entity.city;
    dto.state = entity.state;
    dto.totalArea = Number(entity.totalArea);
    dto.agriculturalArea = Number(entity.agriculturalArea);
    dto.vegetationArea = Number(entity.vegetationArea);
    return dto;
  }
}
