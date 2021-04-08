import { userMessages } from '@common/messages/user.messages';
import { User } from '@domain/user/user';
import { FindUserById } from '@domain/user/user-find-by-id';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('user')
export class FindUserByIdController {
  constructor(private readonly findUserById: FindUserById) {}

  @Get(':userId')
  public async findById(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    const user = await this.findUserById.execute(userId);
    if (typeof user === 'undefined')
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: userMessages.NOT_FOUND,
        error: 'Not Found',
      });
    return user;
  }
}
