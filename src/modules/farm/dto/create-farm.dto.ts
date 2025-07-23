import { IsValidFarmAreaConstraint } from '@/shared/validators/is-valid-farm-area.validator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({ example: 'Fazenda Esperança' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Manaus' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'AM' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 100.5 })
  @IsNumber()
  totalArea: number;

  @ApiProperty({ example: 60.25 })
  @IsNumber()
  agriculturalArea: number;

  @ApiProperty({ example: 40.25 })
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({ example: 'be45d8dc-5e92-4fbb-9178-9c10b377c1dc' })
  @IsUUID()
  producerId: string;

  @ApiProperty({
    example: true,
    description: 'Validação automática se soma das áreas bate com totalArea',
  })
  @Validate(IsValidFarmAreaConstraint)
  checkAreas: boolean;
}
