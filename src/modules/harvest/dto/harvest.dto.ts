import { HarvestEntity } from '@/common/entities/harvest.entity';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  static fromEntity(entity: HarvestEntity): HarvestDto {
    const dto = new HarvestDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.year = entity.year;
    return dto;
  }
}
