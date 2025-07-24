import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('HttpExceptionFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any)?.message || 'Internal server error';

    const errorResponse = {
      statusCode: status,
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      {
        method: request.method,
        url: request.url,
        statusCode: status,
        stack: (exception as any)?.stack,
      },
      `Request failed: ${errorResponse.message}`,
    );

    response.status(status).json(errorResponse);
  }
}
