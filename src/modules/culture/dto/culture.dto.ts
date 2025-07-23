import { ApiProperty } from '@nestjs/swagger';
import { CultureEntity } from '@/common/entities/culture.entity';

export class CultureDto {
  @ApiProperty({ example: 'ae8e72f1-4f7c-4c3b-bc66-1d901c4e8e1f' })
  id: string;

  @ApiProperty({ example: 'Soja' })
  name: string;

  static fromEntity(entity: CultureEntity): CultureDto {
    const dto = new CultureDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
