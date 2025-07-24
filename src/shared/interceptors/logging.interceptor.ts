import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl, body, params, query } = req;
    const requestId = uuidv4();
    const now = Date.now();

    this.logger.info(
      {
        requestId,
        method,
        url: originalUrl,
        body,
        params,
        query,
      },
      'Incoming request',
    );

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - now;
        this.logger.info(
          {
            requestId,
            method,
            url: originalUrl,
            duration,
            response,
          },
          'Request handled successfully',
        );
      }),
      catchError((err) => {
        const duration = Date.now() - now;
        this.logger.error(
          {
            requestId,
            method,
            url: originalUrl,
            duration,
            stack: err.stack,
            error: err.message,
          },
          'Request failed',
        );
        throw err;
      }),
    );
  }
}
