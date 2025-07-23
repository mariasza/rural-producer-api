import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerRepo: Repository<ProducerEntity>,
  ) {}

  create(dto: CreateProducerDto) {
    const producer = this.producerRepo.create(dto);
    return this.producerRepo.save(producer);
  }

  findAll() {
    return this.producerRepo.find();
  }

  async findOne(id: string) {
    const producer = await this.producerRepo.findOne({ where: { id } });
    if (!producer) throw new NotFoundException('Producer not found');
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto) {
    const producer = await this.findOne(id);
    Object.assign(producer, dto);
    return this.producerRepo.save(producer);
  }

  async remove(id: string) {
    const producer = await this.findOne(id);
    return this.producerRepo.remove(producer);
  }
}
