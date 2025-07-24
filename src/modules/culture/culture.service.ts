import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/services/base.service';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CultureService extends BaseService<CultureEntity> {
  constructor(
    @InjectRepository(CultureEntity)
    repository: Repository<CultureEntity>,
    protected readonly logger: PinoLogger,
  ) {
    super(repository, logger);
  }
}
