import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';

@Injectable()
export class CultureService {
  constructor(
    @InjectRepository(CultureEntity)
    private readonly cultureRepo: Repository<CultureEntity>,
  ) {}

  async create(dto: CreateCultureDto): Promise<CultureEntity> {
    const culture = this.cultureRepo.create(dto);
    return this.cultureRepo.save(culture);
  }

  async findAll(): Promise<CultureEntity[]> {
    return this.cultureRepo.find();
  }

  async findOne(id: string): Promise<CultureEntity> {
    const culture = await this.cultureRepo.findOne({ where: { id } });
    if (!culture) throw new NotFoundException('Culture not found');
    return culture;
  }

  async update(id: string, dto: UpdateCultureDto): Promise<CultureEntity> {
    const culture = await this.findOne(id);
    Object.assign(culture, dto);
    return this.cultureRepo.save(culture);
  }

  async remove(id: string): Promise<void> {
    const culture = await this.findOne(id);
    await this.cultureRepo.remove(culture);
  }
}
