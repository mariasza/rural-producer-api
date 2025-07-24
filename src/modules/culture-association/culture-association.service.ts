import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { In, Repository } from 'typeorm';
import { AssociateCulturesDto } from './dto/associate-cultures.dto';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CultureAssociationService {
  constructor(
    @InjectRepository(FarmCultureHarvestEntity)
    private readonly associationRepo: Repository<FarmCultureHarvestEntity>,

    @InjectRepository(FarmEntity)
    private readonly farmRepo: Repository<FarmEntity>,

    @InjectRepository(HarvestEntity)
    private readonly harvestRepo: Repository<HarvestEntity>,

    @InjectRepository(CultureEntity)
    private readonly cultureRepo: Repository<CultureEntity>,

    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(CultureAssociationService.name);
  }

  async associateCultures(
    farmId: string,
    harvestId: string,
    dto: AssociateCulturesDto,
  ) {
    this.logger.info(
      `Associating cultures to farm=${farmId} and harvest=${harvestId}`,
    );

    const farm = await this.farmRepo.findOne({ where: { id: farmId } });
    if (!farm) {
      this.logger.warn(`Farm not found: ${farmId}`);
      throw new NotFoundException('Farm not found');
    }

    const harvest = await this.harvestRepo.findOne({
      where: { id: harvestId },
    });
    if (!harvest) {
      this.logger.warn(`Harvest not found: ${harvestId}`);
      throw new NotFoundException('Harvest not found');
    }

    const cultures = await this.cultureRepo.findBy({ id: In(dto.cultureIds) });
    if (cultures.length !== dto.cultureIds.length) {
      this.logger.warn(
        `Some cultures not found: expected=${dto.cultureIds.length}, found=${cultures.length}`,
      );
      throw new NotFoundException('One or more cultures not found');
    }

    const associations = cultures.map((culture) =>
      this.associationRepo.create({ farm, harvest, culture }),
    );

    const saved = await this.associationRepo.save(associations);
    this.logger.info(
      `Successfully associated ${cultures.length} cultures to farm=${farmId}, harvest=${harvestId}`,
    );

    return saved;
  }

  async findByFarm(farmId: string) {
    this.logger.info(`Finding associations by farm: ${farmId}`);
    return this.associationRepo.find({
      where: { farm: { id: farmId } },
      relations: ['farm', 'harvest', 'culture'],
    });
  }

  async findByHarvest(harvestId: string) {
    this.logger.info(`Finding associations by harvest: ${harvestId}`);
    return this.associationRepo.find({
      where: { harvest: { id: harvestId } },
      relations: ['farm', 'harvest', 'culture'],
    });
  }

  async findByFarmAndHarvest(farmId: string, harvestId: string) {
    this.logger.info(
      `Finding associations by farm=${farmId} and harvest=${harvestId}`,
    );
    return this.associationRepo.find({
      where: {
        farm: { id: farmId },
        harvest: { id: harvestId },
      },
      relations: ['farm', 'harvest', 'culture'],
    });
  }
}
