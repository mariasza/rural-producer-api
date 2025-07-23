import { IsNotEmpty } from 'class-validator';
import { IsCPFOrCNPJ } from '@/shared/validators/is-cpf-or-cnpj.validator';

export class CreateProducerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsCPFOrCNPJ({ message: 'document must be a valid CPF or CNPJ' })
  document: string;
}
