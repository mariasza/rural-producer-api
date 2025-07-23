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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TransformTo } from '@/shared/decorators/transform-to.decorator';

@ApiTags('Producers')
@TransformTo(ProducerDto)
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiOkResponse({ type: ProducerDto })
  create(@Body() dto: CreateProducerDto): Promise<ProducerDto> {
    return this.producerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all producers' })
  @ApiOkResponse({ type: [ProducerDto] })
  findAll(): Promise<ProducerDto[]> {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a producer by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ProducerDto })
  findOne(@Param('id') id: string): Promise<ProducerDto> {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a producer by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ProducerDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProducerDto,
  ): Promise<ProducerDto> {
    return this.producerService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a producer by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ProducerDto })
  remove(@Param('id') id: string): Promise<ProducerDto> {
    return this.producerService.remove(id);
  }
}
