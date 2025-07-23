import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity, ProducerEntity])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
