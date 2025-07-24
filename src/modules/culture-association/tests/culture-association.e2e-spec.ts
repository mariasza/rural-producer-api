import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { DataSource } from 'typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { createCultureEntity } from '@/common/tests/factories/entities/culture.entity.factory';
import { createHarvestEntity } from '@/common/tests/factories/entities/harvest.entity.factory';
import { createProducerEntity } from '@/common/tests/factories/entities/producer.entity.factory';
import { createFarmEntity } from '@/common/tests/factories/entities/farm.entity.factory';

describe('CultureAssociation (e2e)', () => {
  let app: INestApplication;
  let db: DataSource;

  let farmId: string;
  let harvestId: string;
  let cultureIds: string[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    db = module.get(DataSource);

    const producerRepo = db.getRepository(ProducerEntity);
    const farmRepo = db.getRepository(FarmEntity);
    const harvestRepo = db.getRepository(HarvestEntity);
    const cultureRepo = db.getRepository(CultureEntity);

    const producer = await producerRepo.save(createProducerEntity());
    const farm = await farmRepo.save(createFarmEntity({ producer }));
    farmId = farm.id;

    const harvest = await harvestRepo.save(createHarvestEntity());
    harvestId = harvest.id;

    const c1 = await cultureRepo.save(createCultureEntity());
    const c2 = await cultureRepo.save(createCultureEntity());
    cultureIds = [c1.id, c2.id];
  });

  it('should associate cultures to farm and harvest', async () => {
    const res = await request(app.getHttpServer())
      .post(`/cultures/${farmId}/${harvestId}`)
      .send({ cultureIds })
      .expect(201);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('farm');
    expect(res.body[0]).toHaveProperty('harvest');
    expect(res.body[0]).toHaveProperty('culture');
  });

  it('should get cultures by farm', async () => {
    const res = await request(app.getHttpServer())
      .get(`/cultures/farm/${farmId}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get cultures by harvest', async () => {
    const res = await request(app.getHttpServer())
      .get(`/cultures/harvest/${harvestId}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get cultures by farm and harvest', async () => {
    const res = await request(app.getHttpServer())
      .get(`/cultures/${farmId}/${harvestId}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    await app.close();
  });
});
