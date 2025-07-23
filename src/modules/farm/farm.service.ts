import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';
import { ProducerEntity } from '@/common/entities/producer.entity';

@Injectable()
export class FarmService extends BaseService<FarmEntity> {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepo: Repository<FarmEntity>,

    @InjectRepository(ProducerEntity)
    private readonly producerRepo: Repository<ProducerEntity>,
  ) {
    super(farmRepo);
  }

  async create(data: Partial<FarmEntity>) {
    const producer = await this.producerRepo.findOneBy({
      id: data.producer?.id,
    });
    if (!producer) throw new NotFoundException('Producer not found');
    const farm = this.farmRepo.create({ ...data, producer });
    return this.farmRepo.save(farm);
  }

  findAll() {
    return this.farmRepo.find({ relations: { producer: true } });
  }

  async findOne(id: string) {
    return this.farmRepo.findOne({
      where: { id },
      relations: { producer: true },
    });
  }
}
