import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string): Promise<any> {
    const user = this.userRepository.findUserById(userId);
    if (typeof user === 'undefined') throw new UserNotFoundError();
    await this.userRepository.deleteUserById(userId);
    return user;
  }
}
