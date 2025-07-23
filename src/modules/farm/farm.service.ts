import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepo: Repository<FarmEntity>,

    @InjectRepository(ProducerEntity)
    private readonly producerRepo: Repository<ProducerEntity>,
  ) {}

  async create(dto: CreateFarmDto) {
    const producer = await this.producerRepo.findOneBy({ id: dto.producerId });
    if (!producer) throw new NotFoundException('Producer not found');

    const farm = this.farmRepo.create({ ...dto, producer });
    return this.farmRepo.save(farm);
  }

  findAll() {
    return this.farmRepo.find({ relations: ['producer'] });
  }

  async findOne(id: string) {
    const farm = await this.farmRepo.findOne({
      where: { id },
      relations: ['producer'],
    });
    if (!farm) throw new NotFoundException('Farm not found');
    return farm;
  }

  async update(id: string, dto: UpdateFarmDto) {
    const farm = await this.findOne(id);

    Object.assign(farm, dto);
    return this.farmRepo.save(farm);
  }

  async remove(id: string) {
    const farm = await this.findOne(id);
    return this.farmRepo.remove(farm);
  }
}
