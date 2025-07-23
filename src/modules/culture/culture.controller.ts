import { Controller } from '@nestjs/common';
import { CultureService } from './culture.service';

@Controller('culture')
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}
}
