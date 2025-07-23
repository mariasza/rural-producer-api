import { CultureEntity } from '@/common/entities/culture.entity';

export class CultureDto {
  id: string;
  name: string;

  static fromEntity(entity: CultureEntity): CultureDto {
    const dto = new CultureDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
