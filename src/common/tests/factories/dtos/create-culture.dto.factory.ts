import { faker } from '@faker-js/faker';
import { CreateCultureDto } from '@/modules/culture/dto/create-culture.dto';

export function createCultureDto(): CreateCultureDto {
  return {
    name: faker.word.sample(),
  };
}
