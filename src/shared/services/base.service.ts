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
import { PinoLogger } from 'nestjs-pino';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

export abstract class BaseService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly logger: PinoLogger,
  ) {}

  async create(data: DeepPartial<T>): Promise<T> {
    this.logger.info({ data }, `Creating new ${this.repository.metadata.name}`);
    try {
      const entity = this.repository.create(data);
      const saved = await this.repository.save(entity);
      this.logger.info(
        { saved },
        `Successfully created ${this.repository.metadata.name}`,
      );
      return saved;
    } catch (error) {
      this.logger.error(
        error,
        `Failed to create ${this.repository.metadata.name}`,
      );
      this.handleDatabaseError(error);
    }
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    this.logger.debug(`Fetching all ${this.repository.metadata.name}`);
    return this.repository.find(options);
  }

  async findOne(id: string): Promise<T> {
    this.logger.debug(
      `Fetching ${this.repository.metadata.name} with ID ${id}`,
    );
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      this.logger.warn(
        `${this.repository.metadata.name} not found with ID ${id}`,
      );
      throw new NotFoundException(`${this.repository.metadata.name} not found`);
    }
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    this.logger.info(
      { data },
      `Updating ${this.repository.metadata.name} with ID ${id}`,
    );
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    const updated = await this.repository.save(entity);
    this.logger.info(
      `Successfully updated ${this.repository.metadata.name} with ID ${id}`,
    );
    return updated;
  }

  async remove(id: string): Promise<T> {
    this.logger.warn(`Removing ${this.repository.metadata.name} with ID ${id}`);
    const entity = await this.findOne(id);
    const removed = await this.repository.remove(entity);
    this.logger.info(
      `Successfully removed ${this.repository.metadata.name} with ID ${id}`,
    );
    return removed;
  }

  protected handleDatabaseError(error: unknown): never {
    if (
      error instanceof QueryFailedError &&
      (error as any)?.code === PG_UNIQUE_CONSTRAINT_VIOLATION
    ) {
      this.logger.warn(
        `Unique constraint violation in ${this.repository.metadata.name}`,
      );
      throw new ConflictException('Record already exists.');
    }

    this.logger.error(
      error,
      `Unexpected error in ${this.repository.metadata.name}`,
    );
    throw new InternalServerErrorException('Unexpected database error.');
  }
}
