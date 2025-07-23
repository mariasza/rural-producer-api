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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Producers')
@TransformTo(ProducerDto)
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  create(@Body() dto: CreateProducerDto) {
    return this.producerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all producers' })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a producer by ID' })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a producer by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateProducerDto) {
    return this.producerService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a producer by ID' })
  remove(@Param('id') id: string): Promise<ProducerDto> {
    return this.producerService.remove(id);
  }
}
