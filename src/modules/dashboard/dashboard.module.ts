import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { FarmEntity } from '@/common/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
