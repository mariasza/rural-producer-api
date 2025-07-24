import { DataSource } from 'typeorm';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { createProducerDto } from '../dtos/create-producer.dto.factory';
import { createFarmDto } from '../dtos/create-farm.dto.factory';
import { createHarvestDto } from '../dtos/create-harvest.dto.factory';
import { createManyCultures } from './create-many-cultures';

export async function createAndSaveAllMockEntities(
  db: DataSource,
  cultureCount = 3,
): Promise<{
  producer: ProducerEntity;
  farm: FarmEntity;
  harvest: HarvestEntity;
  cultures: CultureEntity[];
}> {
  const producer = await db
    .getRepository(ProducerEntity)
    .save(createProducerDto());
  const farm = await db
    .getRepository(FarmEntity)
    .save(createFarmDto(producer.id));
  const harvest = await db
    .getRepository(HarvestEntity)
    .save(createHarvestDto());
  const cultures = await createManyCultures(db, cultureCount);

  return { producer, farm, harvest, cultures };
}
