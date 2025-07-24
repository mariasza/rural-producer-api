import { Test, TestingModule } from '@nestjs/testing';
import { CultureAssociationService } from '../culture-association.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmCultureHarvestEntity } from '@/common/entities/farm-culture-harvest.entity';
import { FarmEntity } from '@/common/entities/farm.entity';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { CultureEntity } from '@/common/entities/culture.entity';
import { Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '@nestjs/common';
import { AssociateCulturesDto } from '../dto/associate-cultures.dto';

describe('CultureAssociationService', () => {
  let service: CultureAssociationService;
  let farmRepo: jest.Mocked<Repository<FarmEntity>>;
  let harvestRepo: jest.Mocked<Repository<HarvestEntity>>;
  let cultureRepo: jest.Mocked<Repository<CultureEntity>>;
  let assocRepo: jest.Mocked<Repository<FarmCultureHarvestEntity>>;

  const mockLogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    setContext: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultureAssociationService,
        {
          provide: getRepositoryToken(FarmEntity),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(HarvestEntity),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(CultureEntity),
          useValue: { findByIds: jest.fn() },
        },
        {
          provide: getRepositoryToken(FarmCultureHarvestEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        { provide: PinoLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get(CultureAssociationService);
    farmRepo = module.get(getRepositoryToken(FarmEntity));
    harvestRepo = module.get(getRepositoryToken(HarvestEntity));
    cultureRepo = module.get(getRepositoryToken(CultureEntity));
    assocRepo = module.get(getRepositoryToken(FarmCultureHarvestEntity));
  });

  it('should associate cultures successfully', async () => {
    const farm = { id: 'farm1' } as FarmEntity;
    const harvest = { id: 'harvest1' } as HarvestEntity;
    const cultures = [
      { id: 'c1', name: 'Milho' },
      { id: 'c2', name: 'Soja' },
    ] as CultureEntity[];

    const dto: AssociateCulturesDto = {
      cultureIds: ['c1', 'c2'],
    };

    farmRepo.findOne.mockResolvedValue(farm);
    harvestRepo.findOne.mockResolvedValue(harvest);
    cultureRepo.findByIds.mockResolvedValue(cultures);

    assocRepo.create.mockImplementation(
      (data) => data as FarmCultureHarvestEntity,
    );

    const expectedAssociations: FarmCultureHarvestEntity[] = [
      { farm, harvest, culture: cultures[0] },
      { farm, harvest, culture: cultures[1] },
    ] as FarmCultureHarvestEntity[];

    (assocRepo.save as jest.Mock).mockResolvedValue(expectedAssociations);

    const result = await service.associateCultures('farm1', 'harvest1', dto);

    expect(result).toHaveLength(2);
    expect(cultureRepo.findByIds).toHaveBeenCalledWith(dto.cultureIds);
    expect(assocRepo.create).toHaveBeenCalledTimes(2);
    expect(assocRepo.save).toHaveBeenCalledWith(expectedAssociations);
  });

  it('should throw NotFoundException if farm not found', async () => {
    farmRepo.findOne.mockResolvedValue(null);
    const dto: AssociateCulturesDto = { cultureIds: [] };

    await expect(service.associateCultures('x', 'y', dto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
