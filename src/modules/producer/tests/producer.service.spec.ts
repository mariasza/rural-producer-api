import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerEntity } from '@/common/entities/producer.entity';
import { ProducerService } from '../producer.service';
import { PinoLogger } from 'nestjs-pino';

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
    const dto = { name: 'João', document: '12345678909' };
    const entity = { id: '1', ...dto } as ProducerEntity;
    repo.create.mockReturnValue(entity);
    repo.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(entity);
  });

  it('should return all producers', async () => {
    const producers = [{ id: '1', name: 'Maria' }];
    repo.find.mockResolvedValue(producers as any);

    const result = await service.findAll();
    expect(result).toEqual(producers);
  });

  it('should return one producer', async () => {
    const producer = { id: '1', name: 'Ana' } as ProducerEntity;
    repo.findOne.mockResolvedValue(producer);

    const result = await service.findOne('1');
    expect(result).toEqual(producer);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update a producer', async () => {
    const oldProducer = { id: '1', name: 'Joana' } as ProducerEntity;
    const updatedProducer = { id: '1', name: 'Joana Silva' } as ProducerEntity;

    repo.findOne.mockResolvedValue(oldProducer);
    repo.save.mockResolvedValue(updatedProducer);

    const result = await service.update('1', { name: 'Joana Silva' });
    expect(result).toEqual(updatedProducer);
  });

  it('should remove a producer', async () => {
    const producer = { id: '1', name: 'Carlos' } as ProducerEntity;
    repo.findOne.mockResolvedValue(producer);
    repo.remove.mockResolvedValue(producer);

    const result = await service.remove('1');
    expect(result).toEqual(producer);
  });
});
