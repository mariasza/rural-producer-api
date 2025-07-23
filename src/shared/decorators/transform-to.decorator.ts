import { SetMetadata } from '@nestjs/common';

export const TRANSFORM_TO_KEY = 'transformTo';

export const TransformTo = (dto: any) => SetMetadata(TRANSFORM_TO_KEY, dto);
