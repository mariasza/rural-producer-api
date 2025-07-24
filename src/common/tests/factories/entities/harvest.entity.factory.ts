import { faker } from '@faker-js/faker';
import { HarvestEntity } from '@/common/entities/harvest.entity';

export function createHarvestEntity(
  override: Partial<HarvestEntity> = {},
): HarvestEntity {
  return {
    id: faker.string.uuid(),
    name: `Safra ${faker.word.noun()}`,
    year: faker.date.past().getFullYear(),
    ...override,
    farmCultureHarvests: [],
  };
}
