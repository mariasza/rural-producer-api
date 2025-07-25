import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmEntity } from '@/common/entities/farm.entity';
import { Repository } from 'typeorm';
import { DashboardResultDto } from './dto/dashboard.result.dto';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepository: Repository<FarmEntity>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(DashboardService.name);
  }

  async getDashboardData(): Promise<DashboardResultDto> {
    this.logger.info('Fetching dashboard data...');
    try {
      const farms = await this.farmRepository.find({
        relations: { producer: true, farmCultureHarvests: { culture: true } },
      });

      const totalFarms = farms.length;
      const totalHectares = farms.reduce(
        (acc, farm) => acc + Number(farm.totalArea),
        0,
      );

      const byState = this.groupBy(farms, (farm) => farm.state);
      const byCulture = this.groupBy(
        farms.flatMap((farm) => farm.farmCultureHarvests || []),
        (fch) => fch.culture?.name || 'Desconhecido',
      );

      const landUse = {
        agriculture: farms.reduce(
          (acc, f) => acc + Number(f.agriculturalArea),
          0,
        ),
        vegetation: farms.reduce((acc, f) => acc + Number(f.vegetationArea), 0),
      };

      const result: DashboardResultDto = {
        totalFarms,
        totalHectares,
        charts: {
          byState,
          byCulture,
          landUse,
        },
      };

      this.logger.info('Dashboard data successfully generated', {
        totalFarms,
        totalHectares,
      });

      return result;
    } catch (error) {
      this.logger.error('Error generating dashboard data', error);
      throw error;
    }
  }

  private groupBy<T>(items: T[], keyFn: (item: T) => string) {
    return items.reduce(
      (acc, item) => {
        const key = keyFn(item);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
