import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
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
  ): Promise<any> {
    try {
      await this.deleteUserByIdUseCase.execute(userId);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
    }
  }
}
