import { IsValidFarmAreaConstraint } from '@/shared/validators/is-valid-farm-area.validator';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUUID,
  Validate,
} from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  agriculturalArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsUUID()
  producerId: string;

  @Validate(IsValidFarmAreaConstraint)
  checkAreas: boolean;
}
