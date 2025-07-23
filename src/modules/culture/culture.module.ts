import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { CultureService } from './culture.service';
import { CultureController } from './culture.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CultureEntity])],
  controllers: [CultureController],
  providers: [CultureService],
})
export class CultureModule {}
