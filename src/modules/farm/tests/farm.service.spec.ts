import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from '../farm.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '@nestjs/common';
import { createFarmEntity } from '@/common/tests/factories/entities/farm.entity.factory';
import { createFarmDto } from '@/common/tests/factories/dtos/create-farm.dto.factory';

describe('FarmService', () => {
  let service: FarmService;
  let farmRepo: jest.Mocked<Repository<FarmEntity>>;
  let producerRepo: jest.Mocked<Repository<ProducerEntity>>;

  const mockLogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
    debug: jest.fn(),
    setContext: jest.fn(),
  };

  const mockFarmRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
    metadata: { name: 'Farm' },
  };

  const mockProducerRepo = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        { provide: getRepositoryToken(FarmEntity), useValue: mockFarmRepo },
        {
          provide: getRepositoryToken(ProducerEntity),
          useValue: mockProducerRepo,
        },
        { provide: PinoLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmRepo = module.get(getRepositoryToken(FarmEntity));
    producerRepo = module.get(getRepositoryToken(ProducerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a farm with valid producer', async () => {
    const mockProducer: ProducerEntity = {
      id: 'prod-1',
      name: 'Produtor A',
      document: '12345678900',
      farms: [],
    };

    const dto = createFarmDto(mockProducer.id);
    const expectedFarm = createFarmEntity({ ...dto, producer: mockProducer });

    producerRepo.findOneBy.mockResolvedValue(mockProducer);
    farmRepo.create.mockReturnValue(expectedFarm);
    farmRepo.save.mockResolvedValue(expectedFarm);

    const result = await service.create(dto);

    expect(result).toEqual(expectedFarm);
    expect(producerRepo.findOneBy).toHaveBeenCalledWith({ id: dto.producerId });
    expect(farmRepo.save).toHaveBeenCalledWith(expectedFarm);
  });

  it('should throw if producer not found', async () => {
    const dto = createFarmDto('non-existent-id');
    producerRepo.findOneBy.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toThrow(NotFoundException);
  });

  it('should list all farms', async () => {
    const farms = [createFarmEntity()];
    farmRepo.find.mockResolvedValue(farms);

    const result = await service.findAll();
    expect(result).toEqual(farms);
  });

  it('should find one farm by id', async () => {
    const farm = createFarmEntity();
    farmRepo.findOne.mockResolvedValue(farm);

    const result = await service.findOne(farm.id);
    expect(result).toEqual(farm);
  });

  it('should remove a farm', async () => {
    const farm = createFarmEntity();
    farmRepo.findOne.mockResolvedValue(farm);
    farmRepo.remove.mockResolvedValue(farm);

    const result = await service.remove(farm.id);
    expect(result).toEqual(farm);
  });
});
