import { faker } from '@faker-js/faker';
import { CreateFarmDto } from '@/modules/farm/dto/create-farm.dto';

export function createFarmDto(producerId: string): CreateFarmDto {
  const total = faker.number.int({ min: 50, max: 300 });
  const agri = faker.number.int({ min: 10, max: total - 10 });
  const veg = total - agri;

  return {
    name: faker.company.name(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    totalArea: total,
    agriculturalArea: agri,
    vegetationArea: veg,
    producerId,
    checkAreas: true,
  };
}
