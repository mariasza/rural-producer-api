import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty({ example: 'Safra 2025' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  year: number;
}
