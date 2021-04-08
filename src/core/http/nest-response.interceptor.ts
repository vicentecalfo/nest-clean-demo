import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class NestResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          const response = context.switchToHttp().getResponse();
          const { headers, status, body } = controllerResponse;
          const headerNames = Object.getOwnPropertyNames(headers);
          headerNames.forEach((name: string) => {
            this.httpAdapter.setHeader(response, name, headers[name]);
          });
          this.httpAdapter.status(response, status);
          return body;
        }
        return controllerResponse;
      }),
    );
  }
}
