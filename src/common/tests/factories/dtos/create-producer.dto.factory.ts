import { faker } from '@faker-js/faker';
import { CreateProducerDto } from '@/modules/producer/dto/create-producer.dto';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function createProducerDto(): CreateProducerDto {
  return {
    name: faker.person.fullName(),
    document: cpf.generate(),
  };
}

export function createProducerWithCnpjDto(): CreateProducerDto {
  return {
    name: faker.company.name(),
    document: cnpj.generate(),
  };
}
