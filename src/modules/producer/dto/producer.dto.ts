import { ProducerEntity } from '@/common/entities/producer.entity';

export class ProducerDto {
  id: string;
  name: string;
  document: string;

  static fromEntity(entity: ProducerEntity): ProducerDto {
    const dto = new ProducerDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.document = entity.document;
    return dto;
  }
}
