import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { createFarmDto } from '@/common/tests/factories/dtos/create-farm.dto.factory';
import { createProducerDto } from '@/common/tests/factories/dtos/create-producer.dto.factory';

describe('Farm (e2e)', () => {
  let app: INestApplication;
  let createdProducerId: string;
  let createdFarmId: string;

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

    const producerDto = createProducerDto();
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send(producerDto)
      .expect(201);

    createdProducerId = producerRes.body.id;
  });

  afterAll(async () => {
    if (createdProducerId) {
      await request(app.getHttpServer())
        .delete(`/producers/${createdProducerId}`)
        .expect(200);
    }

    await app.close();
  });

  it('should create a new farm with valid areas', async () => {
    const farmDto = createFarmDto(createdProducerId);

    const response = await request(app.getHttpServer())
      .post('/farms')
      .send(farmDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(farmDto.name);
    createdFarmId = response.body.id;
  });

  it('should fail to create a farm with invalid areas', async () => {
    const farmDto = createFarmDto(createdProducerId);
    farmDto.vegetationArea = 10000;
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send(farmDto)
      .expect(400);

    expect(response.body.message[0]).toContain(
      'The sum of agriculturalArea and vegetationArea must not exceed totalArea',
    );
  });

  it('should list all farms', async () => {
    const response = await request(app.getHttpServer())
      .get('/farms')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a farm by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/farms/${createdFarmId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdFarmId);
  });

  it('should delete a farm', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/farms/${createdFarmId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdFarmId);
  });
});
