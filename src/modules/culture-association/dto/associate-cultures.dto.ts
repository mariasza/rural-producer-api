import { IsArray, ArrayNotEmpty, ArrayUnique, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssociateCulturesDto {
  @ApiProperty({
    type: [String],
    example: ['7f8e0cf7-6d79-4c91-bf93-f03b4e8a8651'],
    description: 'Array of culture IDs to associate',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  cultureIds: string[];
}
