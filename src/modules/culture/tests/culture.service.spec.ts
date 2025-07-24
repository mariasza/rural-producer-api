import { CultureService } from '../culture.service';
import { Repository } from 'typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';

describe('CultureService', () => {
  let service: CultureService;
  let repo: jest.Mocked<Repository<CultureEntity>>;

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
    metadata: { name: 'Culture' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultureService,
        { provide: getRepositoryToken(CultureEntity), useValue: mockRepo },
        { provide: PinoLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CultureService>(CultureService);
    repo = module.get(getRepositoryToken(CultureEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a culture', async () => {
    const dto = { name: 'Milho' };
    const entity = { id: '1', ...dto } as CultureEntity;
    repo.create.mockReturnValue(entity);
    repo.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(entity);
  });

  it('should return all cultures', async () => {
    const cultures = [{ id: '1', name: 'Soja' }];
    repo.find.mockResolvedValue(cultures as any);

    const result = await service.findAll();
    expect(result).toEqual(cultures);
  });

  it('should return one culture', async () => {
    const culture = { id: '1', name: 'Arroz' } as CultureEntity;
    repo.findOne.mockResolvedValue(culture);

    const result = await service.findOne('1');
    expect(result).toEqual(culture);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update a culture', async () => {
    const oldCulture = { id: '1', name: 'Feijão' } as CultureEntity;
    const updatedCulture = { id: '1', name: 'Feijão Preto' } as CultureEntity;

    repo.findOne.mockResolvedValue(oldCulture);
    repo.save.mockResolvedValue(updatedCulture);

    const result = await service.update('1', { name: 'Feijão Preto' });
    expect(result).toEqual(updatedCulture);
  });

  it('should remove a culture', async () => {
    const culture = { id: '1', name: 'Trigo' } as CultureEntity;
    repo.findOne.mockResolvedValue(culture);
    repo.remove.mockResolvedValue(culture);

    const result = await service.remove('1');
    expect(result).toEqual(culture);
  });
});
