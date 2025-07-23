import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureAssociationService } from './culture-association.service';
import { CultureAssociationController } from './culture-association.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FarmCultureHarvestEntity,
      CultureEntity,
      FarmEntity,
      HarvestEntity,
    ]),
  ],
  controllers: [CultureAssociationController],
  providers: [CultureAssociationService],
})
export class CultureAssociationModule {}
