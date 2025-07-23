import { ApiProperty } from '@nestjs/swagger';
import { ChartsDto } from './charts.dto';

export class DashboardResultDto {
  @ApiProperty({ example: 10, description: 'Total number of farms' })
  totalFarms: number;

  @ApiProperty({ example: 1587.4, description: 'Total area in hectares' })
  totalHectares: number;

  @ApiProperty({ type: ChartsDto })
  charts: ChartsDto;
}
