import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create';
import { User } from '../user.entity';

@Controller('user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  public async create(@Body() user: User): Promise<NestResponse> {
    const createdUser = await this.createUserUseCase.execute(user);
    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/user/${createdUser.id}`,
      })
      .body(createdUser)
      .build();
  }
}
