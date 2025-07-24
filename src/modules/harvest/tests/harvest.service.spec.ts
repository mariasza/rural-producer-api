import { HarvestService } from '../harvest.service';
import { Repository } from 'typeorm';
import { HarvestEntity } from '@/common/entities/harvest.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

describe('HarvestService', () => {
  let service: HarvestService;
  let repo: jest.Mocked<Repository<HarvestEntity>>;

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
  };

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    metadata: { name: 'Harvest' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        { provide: getRepositoryToken(HarvestEntity), useValue: mockRepo },
        { provide: PinoLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    repo = module.get(getRepositoryToken(HarvestEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a harvest', async () => {
    const dto = { name: 'Safra 2025' };
    const entity = { id: '1', ...dto } as HarvestEntity;
    repo.create.mockReturnValue(entity);
    repo.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(entity);
  });

  it('should return all harvests', async () => {
    const harvests = [{ id: '1', name: 'Safra 2024' }];
    repo.find.mockResolvedValue(harvests as any);

    const result = await service.findAll();
    expect(result).toEqual(harvests);
  });

  it('should return one harvest', async () => {
    const harvest = { id: '1', name: 'Safra 2023' } as HarvestEntity;
    repo.findOne.mockResolvedValue(harvest);

    const result = await service.findOne('1');
    expect(result).toEqual(harvest);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should remove a harvest', async () => {
    const harvest = { id: '1', name: 'Safra 2022' } as HarvestEntity;
    repo.findOne.mockResolvedValue(harvest);
    repo.remove.mockResolvedValue(harvest);

    const result = await service.remove('1');
    expect(result).toEqual(harvest);
  });
});
