import { IsArray, ArrayNotEmpty, ArrayUnique, IsUUID } from 'class-validator';

export class AssociateCulturesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  cultureIds: string[];
}
