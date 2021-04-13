import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserMailProvider } from '../providers/user-mail.provider';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(
    private userRepository: UserRepository,
    private userMailProvider: UserMailProvider,
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    if (typeof user === 'undefined') throw new UserNotFoundError();
    await this.userRepository.deleteUserById(userId);
    this.userMailProvider.sendToDeletedUser(user);
    return user;
  }
}
