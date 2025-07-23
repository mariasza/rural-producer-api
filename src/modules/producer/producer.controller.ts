import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerDto } from './dto/producer.dto';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';

@Controller('producers')
@TransformTo(ProducerDto)
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() dto: CreateProducerDto) {
    return this.producerService.create(dto);
  }

  @Get()
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
    return this.producerService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ProducerDto> {
    return this.producerService.remove(id);
  }
}
