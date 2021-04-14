import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionHttpFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    function buildException(error: string) {
      return {
        status: HttpStatus[error],
        body: {
          statusCode: HttpStatus[error],
          message: exception.message,
        },
      };
    }
    const exceptions = {
      NotFoundError: buildException('NOT_FOUND'),
      ConstraintViolationError: buildException('CONFLICT'),
      Error: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
          message: exception.message,
          path: request.path,
        },
      },
    };
    const exceptionName = exception.constructor.name;
    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : exceptions.hasOwnProperty(exceptionName)
        ? exceptions[exceptionName]
        : exceptions.Error;
    this.httpAdapter.reply(response, body, status);
  }
}
