import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { Logger } from 'nestjs-pino';
import {
  createProducerDto,
  createProducerWithCnpjDto,
} from '@/common/tests/factories/dtos/create-producer.dto.factory';

describe('Producer (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let cnpjCreatedId: string;

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
    if (createdId) {
      await request(app.getHttpServer()).delete(`/producers/${createdId}`);
    }
    if (cnpjCreatedId) {
      await request(app.getHttpServer()).delete(`/producers/${cnpjCreatedId}`);
    }
    await app.close();
  });

  it('should create a new producer (CPF)', async () => {
    const dto = createProducerDto();
    const response = await request(app.getHttpServer())
      .post('/producers')
      .send(dto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(dto.name);
    expect(response.body.document).toMatch(/^\d{11}$/);
    createdId = response.body.id;
  });

  it('should fail to create a producer with invalid CPF', async () => {
    const response = await request(app.getHttpServer())
      .post('/producers')
      .send({ name: 'João da Silva', document: '111.111.111-11' })
      .expect(400);

    expect(response.body.message).toContain(
      'document must be a valid CPF or CNPJ',
    );
  });

  it('should create a producer with valid CNPJ', async () => {
    const dto = createProducerWithCnpjDto();

    const response = await request(app.getHttpServer())
      .post('/producers')
      .send(dto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(dto.name);
    expect(response.body.document).toMatch(/^\d{14}$/);
    cnpjCreatedId = response.body.id;
  });

  it('should fail to create a producer with invalid CNPJ', async () => {
    const response = await request(app.getHttpServer())
      .post('/producers')
      .send({ name: 'Empresa Teste Ltda', document: '11.111.111/1111-11' })
      .expect(400);

    expect(response.body.message).toContain(
      'document must be a valid CPF or CNPJ',
    );
  });

  it('should return all producers', async () => {
    const response = await request(app.getHttpServer())
      .get('/producers')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a producer by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/producers/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdId);
  });

  it('should update a producer', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/producers/${createdId}`)
      .send({ name: 'Maria Souza' })
      .expect(200);

    expect(response.body.name).toBe('Maria Souza');
  });

  it('should delete a producer (cpf)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/producers/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdId);
  });

  it('should delete a producer (cnpj)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/producers/${cnpjCreatedId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', cnpjCreatedId);
  });

  it('should return 404 for deleted producer', async () => {
    await request(app.getHttpServer())
      .get(`/producers/${createdId}`)
      .expect(404);
  });
});
