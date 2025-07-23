import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FarmCultureHarvestEntity } from './farm-culture-harvest.entity';

@Entity('harvests')
export class HarvestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => FarmCultureHarvestEntity, (fch) => fch.harvest)
  farmCultures: FarmCultureHarvestEntity[];
}
