import { ProducerEntity } from '@/common/entities/producer.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  static fromEntity(entity: ProducerEntity): ProducerDto {
    const dto = new ProducerDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.document = entity.document;
    return dto;
  }
}
