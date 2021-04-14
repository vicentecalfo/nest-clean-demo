import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create';
import { CreateUserRequestDTO } from './create.DTO';

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  public async create(
    @Body() user: CreateUserRequestDTO,
  ): Promise<NestResponse> {
    const createdUser = await this.createUserUseCase.execute(user);
    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/users/${createdUser.id}`,
      })
      .body(createdUser)
      .build();
  }
}
