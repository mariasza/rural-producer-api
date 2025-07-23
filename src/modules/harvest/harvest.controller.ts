import { Controller } from '@nestjs/common';
import { HarvestService } from './harvest.service';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}
}
