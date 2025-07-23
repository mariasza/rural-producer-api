import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCultureDto {
  @ApiProperty({ example: 'Soja', description: 'Name of the culture' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
