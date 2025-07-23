import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidFarmArea', async: false })
export class IsValidFarmAreaConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const { totalArea, agriculturalArea, vegetationArea } = args.object as any;

    if (
      typeof totalArea !== 'number' ||
      typeof agriculturalArea !== 'number' ||
      typeof vegetationArea !== 'number'
    ) {
      return false;
    }

    return agriculturalArea + vegetationArea <= totalArea;
  }

  defaultMessage(): string {
    return 'The sum of agriculturalArea and vegetationArea must not exceed totalArea';
  }
}
