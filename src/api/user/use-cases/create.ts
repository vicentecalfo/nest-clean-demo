import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';
import { UserMailProvider } from '../providers/user-mail.provider';
import { ConstraintViolationError } from '@common/errors/constraint-violation.error';
import { userMessages } from '../user.messages';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userMailProvider: UserMailProvider,
  ) {}

  public async execute(user: Partial<User>): Promise<User> {
    const emailAlreadyInUse = await this.userRepository.emailAlreadyInUse({
      email: user.email,
    });
    if (emailAlreadyInUse)
      throw new ConstraintViolationError(userMessages.EMAIL_ALREADY_IN_USE);
    const createdUser = await this.userRepository.createUser(user);
    this.userMailProvider.sendToNewUser(createdUser);
    return createdUser;
  }
}
