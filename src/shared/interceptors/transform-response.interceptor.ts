import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { TRANSFORM_TO_KEY } from '../decorators/transform-to.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dto = this.reflector.get(TRANSFORM_TO_KEY, context.getHandler());

    if (!dto) return next.handle();

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => dto.fromEntity(item));
        } else {
          return dto.fromEntity(data);
        }
      }),
    );
  }
}
