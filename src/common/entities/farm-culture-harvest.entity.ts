import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CultureEntity } from './culture.entity';
import { FarmEntity } from './farm.entity';
import { HarvestEntity } from './harvest.entity';

@Entity('farm_culture_harvests')
export class FarmCultureHarvestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => FarmEntity, (farm) => farm.cultures)
  farm: FarmEntity;

  @ManyToOne(() => HarvestEntity, (harvest) => harvest.farmCultures)
  harvest: HarvestEntity;

  @ManyToOne(() => CultureEntity, (culture) => culture.farmCultures)
  culture: CultureEntity;
}
