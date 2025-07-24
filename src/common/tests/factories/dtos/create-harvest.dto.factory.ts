import { faker } from '@faker-js/faker';
import { CreateHarvestDto } from '@/modules/harvest/dto/create-harvest.dto';

export function createHarvestDto(): CreateHarvestDto {
  return {
    name: `Safra ${faker.word.adjective()}`,
    year: faker.number.int({ min: 2020, max: 2030 }),
  };
}
