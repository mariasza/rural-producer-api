import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHarvestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;
}
