import {
  Controller,
  Get,
  HttpStatus,
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
    return user;
  }
}
