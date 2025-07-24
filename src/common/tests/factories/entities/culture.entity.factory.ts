import { faker } from '@faker-js/faker';
import { CultureEntity } from '@/common/entities/culture.entity';

export function createCultureEntity(
  overrides: Partial<CultureEntity> = {},
): CultureEntity {
  return {
    id: faker.string.uuid(),
    name: faker.word.noun(),
    farmCultureHarvests: [],
    ...overrides,
  };
}
