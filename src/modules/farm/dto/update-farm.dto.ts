import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from './create-farm.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Validate } from 'class-validator';
import { IsValidFarmAreaConstraint } from '@/shared/validators/is-valid-farm-area.validator';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {
  @ApiProperty({ example: 'Fazenda Esperança', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Manaus', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'AM', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 100.5, required: false })
  @IsOptional()
  @IsNumber()
  totalArea?: number;

  @ApiProperty({ example: 60.25, required: false })
  @IsOptional()
  @IsNumber()
  agriculturalArea?: number;

  @ApiProperty({ example: 40.25, required: false })
  @IsOptional()
  @IsNumber()
  vegetationArea?: number;

  @IsOptional()
  @Validate(IsValidFarmAreaConstraint)
  checkAreas?: boolean;
}
