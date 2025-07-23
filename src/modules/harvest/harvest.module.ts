import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestEntity])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
