import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerModule } from './modules/producer/producer.module';
import { CultureModule } from './modules/culture/culture.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FarmModule } from './modules/farm/farm.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { CultureAssociationModule } from './modules/culture-association/culture-association.module';
import { CultureAssociationController } from './modules/culture-association/culture-association.controller';
import { CultureAssociationService } from './modules/culture-association/culture-association.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
    CultureModule,
    DashboardModule,
    FarmModule,
    HarvestModule,
    ProducerModule,
    CultureAssociationModule,
  ],
})
export class AppModule {}
