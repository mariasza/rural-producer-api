import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/shared/services/base.service';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class ProducerService extends BaseService<ProducerEntity> {
  constructor(
    @InjectRepository(ProducerEntity)
    repository: Repository<ProducerEntity>,

    protected readonly logger: PinoLogger,
  ) {
    super(repository, logger);
  }
}
