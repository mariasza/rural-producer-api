import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { PinoLogger } from 'nestjs-pino';
import { CreateFarmDto } from './dto/create-farm.dto';

@Injectable()
export class FarmService extends BaseService<FarmEntity> {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepo: Repository<FarmEntity>,

    @InjectRepository(ProducerEntity)
    private readonly producerRepo: Repository<ProducerEntity>,

    protected readonly logger: PinoLogger,
  ) {
    super(farmRepo, logger);
    this.logger.setContext(FarmService.name);
  }

  async create(data: CreateFarmDto) {
    this.logger.info(`Validating producerId=${data.producerId}`);
    const producer = await this.producerRepo.findOneBy({
      id: data.producerId,
    });
    if (!producer) {
      this.logger.warn(`Producer not found: id=${data.producerId}`);
      throw new NotFoundException('Producer not found');
    }

    return super.create({ ...data, producer });
  }

  findAll() {
    return this.farmRepo.find({ relations: { producer: true } });
  }

  findOne(id: string) {
    return this.farmRepo.findOne({
      where: { id },
      relations: { producer: true },
    });
  }
}
