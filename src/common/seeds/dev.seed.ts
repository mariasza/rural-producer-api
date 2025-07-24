import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { createCultureEntity } from '../tests/factories/entities/culture.entity.factory';
import { createFarmEntity } from '../tests/factories/entities/farm.entity.factory';
import { createHarvestEntity } from '../tests/factories/entities/harvest.entity.factory';
import { createProducerEntity } from '../tests/factories/entities/producer.entity.factory';
import { AppDataSource } from '@/shared/database/data-source';

async function run() {
  const dataSource = await AppDataSource.initialize();

  const producerRepo = dataSource.getRepository(ProducerEntity);
  const farmRepo = dataSource.getRepository(FarmEntity);
  const harvestRepo = dataSource.getRepository(HarvestEntity);
  const cultureRepo = dataSource.getRepository(CultureEntity);
  const assocRepo = dataSource.getRepository(FarmCultureHarvestEntity);

  console.log('🌱 Starting seed...');

  const producers = await producerRepo.save([
    createProducerEntity(),
    createProducerEntity(),
    createProducerEntity(),
  ]);

  const farms = await farmRepo.save(
    producers.map((producer) => createFarmEntity({ producer })),
  );

  const harvests = await harvestRepo.save([
    createHarvestEntity(),
    createHarvestEntity(),
  ]);

  const cultures = await cultureRepo.save([
    createCultureEntity(),
    createCultureEntity(),
    createCultureEntity(),
  ]);

  for (const farm of farms) {
    for (const harvest of harvests) {
      const relations = cultures.map((culture) =>
        assocRepo.create({ farm, harvest, culture }),
      );
      await assocRepo.save(relations);
    }
  }

  console.log('✅ Seed complete!');
  await dataSource.destroy();
}

run().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
