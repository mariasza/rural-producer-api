import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FarmEntity } from './farm.entity';

@Entity('producers')
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  document: string;

  @OneToMany(() => FarmEntity, (farm) => farm.producer)
  farms: FarmEntity[];
}
