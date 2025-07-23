import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CultureEntity } from './culture.entity';
import { FarmEntity } from './farm.entity';
import { HarvestEntity } from './harvest.entity';

@Entity('farm_culture_harvests')
export class FarmCultureHarvestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.farmCultureHarvests)
  farm: FarmEntity;

  @ManyToOne(() => HarvestEntity, (harvest) => harvest.farmCultureHarvests)
  harvest: HarvestEntity;

  @ManyToOne(() => CultureEntity, (culture) => culture.farmCultureHarvests)
  culture: CultureEntity;
}
