import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import { CreateUser } from '@domain/user/user-create';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserEntity } from '@persistence/user/user.entity';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  public async create(@Body() user: UserEntity): Promise<NestResponse> {
    const createdUser = await this.createUser.execute(user);
    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/user/${createdUser.id}`,
      })
      .body(createdUser)
      .build();
  }
}
