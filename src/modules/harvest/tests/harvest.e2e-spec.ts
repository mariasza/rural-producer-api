import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { createHarvestDto } from '@/common/tests/factories/dtos/create-harvest.dto.factory';

describe('Harvest (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  const dto = createHarvestDto();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new harvest', async () => {
    const response = await request(app.getHttpServer())
      .post('/harvests')
      .send(dto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(dto.name);
    expect(response.body.year).toBe(dto.year);
    createdId = response.body.id;
  });

  it('should return all harvests', async () => {
    const response = await request(app.getHttpServer())
      .get('/harvests')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a harvest by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/harvests/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdId);
    expect(response.body.name).toBe(dto.name);
  });

  it('should delete a harvest', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/harvests/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdId);
  });

  it('should return 404 for deleted harvest', async () => {
    await request(app.getHttpServer())
      .get(`/harvests/${createdId}`)
      .expect(404);
  });
});
