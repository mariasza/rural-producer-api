import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';

describe('Culture (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

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

  it('should create a new culture', async () => {
    const response = await request(app.getHttpServer())
      .post('/cultures')
      .send({ name: 'Milho' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Milho');
    createdId = response.body.id;
  });

  it('should return all cultures', async () => {
    const response = await request(app.getHttpServer())
      .get('/cultures')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a culture by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/cultures/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdId);
    expect(response.body).toHaveProperty('name', 'Milho');
  });

  it('should update a culture', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/cultures/${createdId}`)
      .send({ name: 'Soja' })
      .expect(200);

    expect(response.body.name).toBe('Soja');
  });

  it('should delete a culture', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/cultures/${createdId}`)
      .expect(200);

    console.log('Deleted culture response:', response.body);
    expect(response.body).toHaveProperty('id', createdId);
  });

  it('should return 404 for deleted culture', async () => {
    await request(app.getHttpServer())
      .get(`/cultures/${createdId}`)
      .expect(404);
  });
});
