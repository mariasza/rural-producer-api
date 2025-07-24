import { DataSource } from 'typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { faker } from '@faker-js/faker';

export async function createManyCultures(
  db: DataSource,
  count = 3,
): Promise<CultureEntity[]> {
  const repo = db.getRepository(CultureEntity);

  const cultures = Array.from({ length: count }).map(() =>
    repo.create({ name: faker.word.sample() }),
  );

  return repo.save(cultures);
}
