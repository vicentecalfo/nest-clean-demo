import { ConstraintViolationError } from '@common/errors/constraint-violation.error';
import { UnableToConnectDBError } from '@common/errors/unable-to-connect-db.error';
import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create';
import { CreateUserRequestDTO } from './create.DTO';

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  public async create(
    @Body() user: CreateUserRequestDTO,
  ): Promise<NestResponse> {
    try {
      const createdUser = await this.createUserUseCase.execute(user);
      return new NestResponseBuilder()
        .status(HttpStatus.CREATED)
        .headers({
          Location: `/users/${createdUser.id}`,
        })
        .body(createdUser)
        .build();
    } catch (error) {
      if (error instanceof ConstraintViolationError) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: error.message,
        });
      }
      if (error instanceof UnableToConnectDBError) {
        throw new ServiceUnavailableException({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: error.message,
        });
      }
    }
  }
}
