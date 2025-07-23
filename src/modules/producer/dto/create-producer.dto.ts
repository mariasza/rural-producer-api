import { IsNotEmpty } from 'class-validator';
import { IsCPFOrCNPJ } from '@/shared/validators/is-cpf-or-cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProducerDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123.456.789-09',
    description: 'CPF ou CNPJ válido',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/[^\d]/g, ''))
  @IsCPFOrCNPJ({ message: 'document must be a valid CPF or CNPJ' })
  document: string;
}
