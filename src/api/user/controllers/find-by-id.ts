import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { FindUserByIdUseCase } from '../use-cases/find-by-id';
import { User } from '../user.entity';

@Controller('users')
export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  @Get(':userId')
  public async findById(
    @Param(
      'userId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    userId: string,
  ): Promise<User> {
    try {
      const user = await this.findUserByIdUseCase.execute(userId);
      return user;
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
