import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class HarvestService extends BaseService<HarvestEntity> {
  constructor(
    @InjectRepository(HarvestEntity)
    repository: Repository<HarvestEntity>,

    protected readonly logger: PinoLogger,
  ) {
    super(repository, logger);
  }
}
