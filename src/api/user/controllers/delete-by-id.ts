import { NestResponse } from '@core/http/nest-response';
import { NestResponseBuilder } from '@core/http/nest-response.builder';
import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
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
    const deletedUser = await this.deleteUserByIdUseCase.execute(userId);
    return new NestResponseBuilder()
      .status(HttpStatus.OK)
      .body(deletedUser)
      .build();
  }
}
