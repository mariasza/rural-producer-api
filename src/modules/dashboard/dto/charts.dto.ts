import { ApiProperty } from '@nestjs/swagger';

export class LandUseDto {
  @ApiProperty({ example: 1200 })
  agriculture: number;

  @ApiProperty({ example: 387.4 })
  vegetation: number;
}

export class ChartsDto {
  @ApiProperty({
    example: { AM: 3, PA: 2 },
    description: 'Total farms by state',
    type: Object,
  })
  byState: Record<string, number>;

  @ApiProperty({
    example: { Milho: 4, Soja: 1 },
    description: 'Total cultures by name',
    type: Object,
  })
  byCulture: Record<string, number>;

  @ApiProperty({ type: LandUseDto })
  landUse: LandUseDto;
}
