import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FarmCultureHarvestEntity } from './farm-culture-harvest.entity';

@Entity('cultures')
export class CultureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => FarmCultureHarvestEntity, (fch) => fch.culture)
  farmCultureHarvests: FarmCultureHarvestEntity[];
}
