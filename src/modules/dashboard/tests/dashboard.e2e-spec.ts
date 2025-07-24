import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import * as request from 'supertest';
import { Logger } from 'nestjs-pino';

describe('Dashboard (e2e)', () => {
  let app: INestApplication;

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

  it('/dashboard (GET) should return dashboard data', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard')
      .expect(200);

    expect(response.body).toHaveProperty('totalFarms');
    expect(response.body).toHaveProperty('totalHectares');
    expect(response.body).toHaveProperty('charts');
    expect(response.body.charts).toHaveProperty('byState');
    expect(response.body.charts).toHaveProperty('byCulture');
    expect(response.body.charts).toHaveProperty('landUse');
  });
});
