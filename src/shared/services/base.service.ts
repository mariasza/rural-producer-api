import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  DeepPartial,
  QueryFailedError,
} from 'typeorm';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';
export abstract class BaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}
  async create(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data as DeepPartial<T>);
      return await this.repository.save(entity);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity)
      throw new NotFoundException(`${this.repository.metadata.name} not found`);
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<T> {
    const entity = await this.findOne(id);
    return this.repository.remove(entity);
  }

  protected handleDatabaseError(error: unknown): never {
    if (
      error instanceof QueryFailedError &&
      (error as any)?.code === PG_UNIQUE_CONSTRAINT_VIOLATION
    ) {
      throw new ConflictException('Record already exists.');
    }

    throw new InternalServerErrorException('Unexpected database error.');
  }
}
