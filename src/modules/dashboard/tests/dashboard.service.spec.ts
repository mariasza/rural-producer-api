import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../dashboard.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { PinoLogger } from 'nestjs-pino';
import { createFarmEntity } from '@/common/tests/factories/entities/farm.entity.factory';
import { createCultureEntity } from '@/common/tests/factories/entities/culture.entity.factory';
import { createFarmCultureHarvestEntity } from '@/common/tests/factories/entities/farm.culture.harvest.entity.factory';

describe('DashboardService', () => {
  let service: DashboardService;

  const milho = createCultureEntity({ name: 'Milho' });
  const soja = createCultureEntity({ name: 'Soja' });

  const mockFarms = [
    createFarmEntity({
      state: 'AM',
      totalArea: 100,
      agriculturalArea: 60,
      vegetationArea: 40,
      farmCultureHarvests: [
        createFarmCultureHarvestEntity({ culture: milho }),
        createFarmCultureHarvestEntity({ culture: soja }),
      ],
    }),
    createFarmEntity({
      state: 'AM',
      totalArea: 50,
      agriculturalArea: 30,
      vegetationArea: 20,
      farmCultureHarvests: [createFarmCultureHarvestEntity({ culture: milho })],
    }),
    createFarmEntity({
      state: 'PA',
      totalArea: 70,
      agriculturalArea: 50,
      vegetationArea: 20,
      farmCultureHarvests: [],
    }),
  ];

  const mockFarmRepo = {
    find: jest.fn().mockResolvedValue(mockFarms),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getRepositoryToken(FarmEntity), useValue: mockFarmRepo },
        {
          provide: PinoLogger,
          useValue: {
            info: jest.fn(),
            error: jest.fn(),
            setContext: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return dashboard data', async () => {
    const result = await service.getDashboardData();

    expect(result.totalFarms).toBe(3);
    expect(result.totalHectares).toBe(220);
    expect(result.charts.byState).toEqual({ AM: 2, PA: 1 });
    expect(result.charts.byCulture).toEqual({ Milho: 2, Soja: 1 });
    expect(result.charts.landUse.agriculture).toBe(140);
    expect(result.charts.landUse.vegetation).toBe(80);
  });
});
