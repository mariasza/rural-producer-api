import { FarmEntity } from '@/common/entities/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FarmDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  totalArea: number;

  @ApiProperty()
  agriculturalArea: number;

  @ApiProperty()
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
