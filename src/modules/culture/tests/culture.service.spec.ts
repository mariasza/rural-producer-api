import { Test, TestingModule } from '@nestjs/testing';
import { CultureService } from '../culture.service';
import { Repository } from 'typeorm';
import { CultureEntity } from '@/common/entities/culture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { faker } from '@faker-js/faker';
import { createCultureDto } from '@/common/tests/factories/dtos/create-culture.dto.factory';

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
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a culture', async () => {
    const dto = createCultureDto();
    const entity = { id: faker.string.uuid(), ...dto } as CultureEntity;

    repo.create.mockReturnValue(entity);
    repo.save.mockResolvedValue(entity);

    const result = await service.create(dto);
    expect(result).toEqual(entity);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(entity);
  });

  it('should return all cultures', async () => {
    const cultures = [
      { id: faker.string.uuid(), name: faker.word.noun() },
      { id: faker.string.uuid(), name: faker.word.noun() },
    ] as CultureEntity[];

    repo.find.mockResolvedValue(cultures);

    const result = await service.findAll();
    expect(result).toEqual(cultures);
  });

  it('should return one culture', async () => {
    const id = faker.string.uuid();
    const culture = { id, name: faker.word.noun() } as CultureEntity;

    repo.findOne.mockResolvedValue(culture);

    const result = await service.findOne(id);
    expect(result).toEqual(culture);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a culture', async () => {
    const id = faker.string.uuid();
    const oldCulture = { id, name: faker.word.noun() } as CultureEntity;
    const updatedDto = createCultureDto();
    const updatedCulture = { id, ...updatedDto } as CultureEntity;

    repo.findOne.mockResolvedValue(oldCulture);
    repo.save.mockResolvedValue(updatedCulture);

    const result = await service.update(id, updatedDto);
    expect(result).toEqual(updatedCulture);
  });

  it('should remove a culture', async () => {
    const id = faker.string.uuid();
    const culture = { id, name: faker.word.noun() } as CultureEntity;

    repo.findOne.mockResolvedValue(culture);
    repo.remove.mockResolvedValue(culture);

    const result = await service.remove(id);
    expect(result).toEqual(culture);
  });
});
