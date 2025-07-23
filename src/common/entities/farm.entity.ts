import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FarmCultureHarvestEntity } from './farm-culture-harvest.entity';
import { ProducerEntity } from './producer.entity';

@Entity('farms')
export class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('decimal')
  totalArea: number;

  @Column('decimal')
  agriculturalArea: number;

  @Column('decimal')
  vegetationArea: number;

  @ManyToOne(() => ProducerEntity, (producer) => producer.farms)
  producer: ProducerEntity;

  @OneToMany(() => FarmCultureHarvestEntity, (fch) => fch.farm)
  farmCultureHarvests: FarmCultureHarvestEntity[];
}
