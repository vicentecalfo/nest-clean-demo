import { UnableToConnectDBError } from '@common/errors/unable-to-connect-db.error';
import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { DeleteUserByIdUseCase } from '../use-cases/delete-by-id';

@Controller('users')
export class DeleteUserByIdController {
  constructor(private deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  @Delete(':userId')
  public async deleteById(
    @Param(
      'userId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    userId: string,
  ): Promise<NestResponse> {
    try {
      const deletedUser = await this.deleteUserByIdUseCase.execute(userId);
      return new NestResponseBuilder()
        .status(HttpStatus.OK)
        .body(deletedUser)
        .build();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
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
