import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { Repository } from 'typeorm';
import { AssociateCulturesDto } from './dto/associate-cultures.dto';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';

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
  ) {}

  async associateCultures(
    farmId: string,
    harvestId: string,
    dto: AssociateCulturesDto,
  ) {
    const farm = await this.farmRepo.findOne({ where: { id: farmId } });
    if (!farm) throw new NotFoundException('Farm not found');

    const harvest = await this.harvestRepo.findOne({
      where: { id: harvestId },
    });
    if (!harvest) throw new NotFoundException('Harvest not found');

    const cultures = await this.cultureRepo.findByIds(dto.cultureIds);
    if (cultures.length !== dto.cultureIds.length) {
      throw new NotFoundException('One or more cultures not found');
    }

    const associations = cultures.map((culture) =>
      this.associationRepo.create({ farm, harvest, culture }),
    );

    return this.associationRepo.save(associations);
  }

  async findByFarm(farmId: string) {
    return this.associationRepo.find({
      where: { farm: { id: farmId } },
      relations: ['farm', 'harvest', 'culture'],
    });
  }

  async findByHarvest(harvestId: string) {
    return this.associationRepo.find({
      where: { harvest: { id: harvestId } },
      relations: ['farm', 'harvest', 'culture'],
    });
  }

  async findByFarmAndHarvest(farmId: string, harvestId: string) {
    return this.associationRepo.find({
      where: {
        farm: { id: farmId },
        harvest: { id: harvestId },
      },
      relations: ['farm', 'harvest', 'culture'],
    });
  }
}
