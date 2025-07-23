import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';

@Injectable()
export class HarvestService extends BaseService<HarvestEntity> {
  constructor(
    @InjectRepository(HarvestEntity)
    repository: Repository<HarvestEntity>,
  ) {
    super(repository);
  }
}
