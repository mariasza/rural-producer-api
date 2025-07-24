import { faker } from '@faker-js/faker';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { cpf } from 'cpf-cnpj-validator';

export function createProducerEntity(
  overrides: Partial<ProducerEntity> = {},
): ProducerEntity {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    document: cpf.generate(),
    ...overrides,
    farms: [],
  };
}
