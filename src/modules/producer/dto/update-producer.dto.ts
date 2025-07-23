import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProducerDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty()
  name: string;
}
