import { faker } from '@faker-js/faker';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { createCultureEntity } from './culture.entity.factory';

export function createFarmCultureHarvestEntity(
  overrides: Partial<FarmCultureHarvestEntity> = {},
): FarmCultureHarvestEntity {
  return {
    id: faker.string.uuid(),
    culture: createCultureEntity(),
    farm: undefined,
    harvest: undefined,
    ...overrides,
  };
}
