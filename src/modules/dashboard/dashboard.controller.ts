import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardResultDto } from './dto/dashboard.result.dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Returns aggregated dashboard statistics',
    type: DashboardResultDto,
  })
  getDashboard(): Promise<DashboardResultDto> {
    return this.dashboardService.getDashboardData();
  }
}
