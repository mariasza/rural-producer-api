import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';

@Injectable()
export class CultureService extends BaseService<CultureEntity> {
  constructor(
    @InjectRepository(CultureEntity)
    repository: Repository<CultureEntity>,
  ) {
    super(repository);
  }
}
