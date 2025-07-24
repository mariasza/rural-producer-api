import { faker } from '@faker-js/faker';
import { AssociateCulturesDto } from '@/modules/culture-association/dto/associate-cultures.dto';

export function createAssociateCulturesDto(
  cultureIds: string[],
): AssociateCulturesDto {
  return {
    cultureIds,
  };
}
