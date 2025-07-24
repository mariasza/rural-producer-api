import { faker } from '@faker-js/faker';
import { FarmEntity } from '@/common/entities/farm.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';

export function createFarmEntity(
  overrides: Partial<FarmEntity> = {},
): FarmEntity {
  const totalArea = faker.number.int({ min: 50, max: 300 });
  const agriculturalArea = faker.number.int({ min: 10, max: totalArea - 10 });
  const vegetationArea = totalArea - agriculturalArea;

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    totalArea,
    agriculturalArea,
    vegetationArea,
    producer: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      document: faker.string.numeric(11),
      farms: [],
    },
    farmCultureHarvests: [],
    ...overrides,
  };
}
