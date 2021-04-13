import { userMessages } from '@messages/user.messages';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
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
    const user = await this.findUserByIdUseCase.execute(userId);
    if (typeof user === 'undefined')
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: userMessages.NOT_FOUND,
        error: 'Not Found',
      });
    return user;
  }
}
