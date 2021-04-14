import { NotFoundError } from '@common/errors/not-found.error';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';
import { userMessages } from '../user.messages';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    if (typeof user === 'undefined')
      throw new NotFoundError(userMessages.NOT_FOUND);
    return user;
  }
}
