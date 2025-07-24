import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { ProducerService } from '../producer.service';
import { PinoLogger } from 'nestjs-pino';
import { createProducerDto } from '@/common/tests/factories/dtos/create-producer.dto.factory';
import { createProducerEntity } from '@/common/tests/factories/entities/producer.entity.factory';

describe('ProducerService', () => {
  let service: ProducerService;
  let repo: jest.Mocked<Repository<ProducerEntity>>;

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
    metadata: { name: 'Producer' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        { provide: getRepositoryToken(ProducerEntity), useValue: mockRepo },
        { provide: PinoLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repo = module.get(getRepositoryToken(ProducerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a producer', async () => {
    const dto = createProducerDto();
    const entity = createProducerEntity(dto);
    repo.create.mockReturnValue(entity);
    repo.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(entity);
  });

  it('should return all producers', async () => {
    const entities = [createProducerEntity(), createProducerEntity()];
    repo.find.mockResolvedValue(entities as any);

    const result = await service.findAll();
    expect(result).toEqual(entities);
  });

  it('should return one producer', async () => {
    const entity = createProducerEntity();
    repo.findOne.mockResolvedValue(entity);

    const result = await service.findOne(entity.id);
    expect(result).toEqual(entity);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: entity.id } });
  });

  it('should update a producer', async () => {
    const oldEntity = createProducerEntity();
    const updatedEntity = { ...oldEntity, name: 'Updated Name' };
    repo.findOne.mockResolvedValue(oldEntity);
    repo.save.mockResolvedValue(updatedEntity);

    const result = await service.update(oldEntity.id, { name: 'Updated Name' });
    expect(result).toEqual(updatedEntity);
  });

  it('should remove a producer', async () => {
    const entity = createProducerEntity();
    repo.findOne.mockResolvedValue(entity);
    repo.remove.mockResolvedValue(entity);

    const result = await service.remove(entity.id);
    expect(result).toEqual(entity);
  });
});
