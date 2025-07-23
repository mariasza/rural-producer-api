import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(HarvestEntity)
    private readonly harvestRepo: Repository<HarvestEntity>,
  ) {}

  async create(dto: CreateHarvestDto): Promise<HarvestEntity> {
    const harvest = this.harvestRepo.create(dto);
    return this.harvestRepo.save(harvest);
  }

  async findAll(): Promise<HarvestEntity[]> {
    return this.harvestRepo.find();
  }

  async findOne(id: string): Promise<HarvestEntity> {
    const harvest = await this.harvestRepo.findOne({ where: { id } });
    if (!harvest) throw new NotFoundException('Harvest not found');
    return harvest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.harvestRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Harvest not found');
  }
}
