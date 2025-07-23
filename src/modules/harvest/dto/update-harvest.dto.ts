import { PartialType } from '@nestjs/mapped-types';
import { CreateHarvestDto } from './create-harvest.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateHarvestDto extends PartialType(CreateHarvestDto) {
  @ApiProperty({ example: 'Safra 2025', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 2025, required: false })
  @IsOptional()
  @IsNumber()
  year?: number;
}
